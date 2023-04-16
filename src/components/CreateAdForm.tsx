import 'react-quill/dist/quill.snow.css';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';

import { entries } from '$/utils/entries';
import { AnnoncesRecord, AnnoncesResponse, AnnoncesTypeOptions, Collections } from '$/utils/pocketbase-types';

import Button from './Button';
import { PicturePreviewer } from './dashboard/PicturePreviewer';
import FormField, { inputClassName } from './FormField';
import { usePocket } from './PocketContext';
import Toggle from './Toggle';

export type FormData = AnnoncesRecord & {
  mainImage: FileList;
  secondaryImages: FileList;
};

function CreateAdForm({ edit }: { edit?: AnnoncesResponse }) {
  const router = useRouter();
  const { pb, user } = usePocket();

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  useEffect(() => {
    if (edit) {
      const { images, id, created, updated, collectionId, collectionName, user, expand, ...rest } = edit;

      entries(rest).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [edit]);

  const { field: description } = useController({
    name: 'description',
    control,
    defaultValue: edit?.description || '',
  });

  const { field: envoi } = useController({
    name: 'envoi',
    control,
    defaultValue: false,
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());
      formData.append('type', data.type);
      formData.append('user', user.id);
      formData.append('envoi', data.envoi ? 'true' : 'false');

      formData.append('images', data.mainImage[0] as Blob);
      for (let i = 0; i < 2; i++) {
        formData.append('images', data.secondaryImages[i] as Blob);
      }

      const create = () => pb.collection(Collections.Annonces).create(formData);
      const update = () => pb.collection(Collections.Annonces).update(edit!.id, formData);

      return edit ? update() : create();
    },
    onSuccess: (data) => {
      const createdSentence = 'Annonce créée avec succès';
      const updatedSentence = 'Annonce mise à jour avec succès';

      toast(edit ? updatedSentence : createdSentence, {
        icon: '🎉',
      });
      router.push(`/annonces/details/${data.id}`);
    },
  });

  const mainImageWatcher = watch('mainImage');
  const secondaryImagesWatcher = watch('secondaryImages');

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="mx-auto grid grid-cols-1 gap-5 rounded bg-white p-8 shadow lg:grid-cols-3"
    >
      <FormField
        register={register('title', {
          required: 'Veuillez entrer un titre',
        })}
        errors={errors.title}
        field="title"
        label="Titre de l'annonce"
      />

      <FormField
        register={register('price', {
          valueAsNumber: true,
          required: 'Veuillez entrer un prix',
        })}
        errors={errors.price}
        field="price"
        type="number"
        label="Prix (en €)"
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="type">Type</label>
        <select
          {...register('type', {
            required: "Veuillez choisir un type d'annonce",
          })}
          className={inputClassName}
        >
          <option value="">Choisissez un type</option>
          {Object.values(AnnoncesTypeOptions).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.type && <span className="text-red-500">{errors.type.message}</span>}
      </div>

      {!edit && (
        <>
          <FormField
            type="file"
            register={register('mainImage', {
              validate: (value) => value.length > 0 && value.length <= 1,
              required: 'Veuillez ajouter une photo',
            })}
            field="images"
            label="Photos principale (max 1)"
            errors={errors.mainImage}
          />
          <FormField
            type="file"
            multiple
            register={register('secondaryImages', {
              validate: (value) => value.length > 0 && value.length <= 2,
            })}
            field="images"
            label="Photos secondaires (max 2)"
            errors={errors.secondaryImages}
          />
        </>
      )}

      {!edit && <PicturePreviewer mainImage={mainImageWatcher} secondaryImages={secondaryImagesWatcher} />}

      <div className="grid lg:col-start-3 lg:row-span-2 lg:row-start-1">
        <Toggle {...envoi} />
      </div>

      <div className="flex flex-col pb-14 lg:col-span-3">
        <label htmlFor="description">Description</label>
        <ReactQuill
          {...description}
          className="[&>.ql-snow.ql-toolbar>*]:text-rg-lightest"
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, 4, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],

              [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
              ['link', 'clean'],
            ],
          }}
        />
      </div>

      <div className="col-start-1">
        <Button type="submit">{edit ? 'Modifier' : 'Créer'}</Button>
      </div>
    </form>
  );
}

export default CreateAdForm;
