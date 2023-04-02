import 'react-quill/dist/quill.snow.css';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useController, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';

import { AnnoncesRecord, AnnoncesTypeOptions, Collections } from '$/utils/pocketbase-types';

import Button from './Button';
import FormField, { inputClassName } from './FormField';
import { usePocket } from './PocketContext';
import Toggle from './Toggle';

export type FormData = AnnoncesRecord & {
  images: FileList;
};

function CreateAdForm() {
  const router = useRouter();
  const { pb, user } = usePocket();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const { field: description } = useController({
    name: 'description',
    control,
    defaultValue: '',
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

      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }

      return pb.collection(Collections.Annonces).create(formData);
    },
    onSuccess: (data) => {
      toast('Annonce créée avec succès', {
        icon: '🎉',
      });
      router.push(`/annonces/details/${data.id}`);
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="grid grid-cols-1 gap-5 p-8 mx-auto bg-white rounded shadow lg:grid-cols-3"
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

      <FormField
        type="file"
        multiple
        register={register('images', {
          validate: (value) => value.length > 0 && value.length <= 3,
          required: 'Veuillez ajouter au moins une photo',
        })}
        field="images"
        label="Photos (max 3)"
        errors={errors.images}
      />

      <div className="grid lg:row-span-2 lg:col-start-3 lg:row-start-1">
        <Toggle {...envoi} />
      </div>

      <div className="flex flex-col lg:col-span-3 pb-14">
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
        <Button type="submit">Créer</Button>
      </div>
    </form>
  );
}

export default CreateAdForm;
