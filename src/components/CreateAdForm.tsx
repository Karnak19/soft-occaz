import 'react-quill/dist/quill.snow.css';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useController, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';

import { AdsRecord, AdsTypeOptions, Collections } from '$/utils/pocketbase-types';

import Button from './Button';
import FormField, { inputClassName } from './FormField';
import { usePocket } from './PocketContext';

type FormData = AdsRecord & {
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
  const { field } = useController({
    name: 'description',
    control,
    defaultValue: '',
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());
      formData.append('type', data.type);
      formData.append('user', user.id);

      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }

      return pb.collection(Collections.Ads).create(formData);
    },
    onSuccess: (data) => {
      router.push(`/ads/details/${data.id}`);
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="grid grid-cols-2 gap-5 p-8 mx-auto text-sm rounded w-[min(100%,800px)] bg-slate-800"
    >
      <FormField
        register={register('title', {
          required: 'Veuillez entrer un titre',
        })}
        errors={errors.title}
        field="title"
      />

      <FormField
        register={register('price', {
          valueAsNumber: true,
          required: 'Veuillez entrer un prix',
        })}
        errors={errors.price}
        field="price"
        type="number"
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="type">Type</label>
        <select
          {...register('type', {
            required: true,
          })}
          className={inputClassName}
        >
          {Object.values(AdsTypeOptions).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <FormField
        type="file"
        multiple
        register={register('images', {
          validate: (value) => value.length > 0 && value.length <= 3,
          required: 'Veuillez ajouter au moins une photo',
        })}
        field="images"
        errors={errors.images}
      />
      <div className="flex flex-col col-span-2 pb-14">
        <label htmlFor="description">Description</label>
        <ReactQuill
          {...field}
          className="[&>.ql-snow.ql-toolbar>*]:text-slate-200"
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
      <div>
        <Button type="submit">Créer</Button>
      </div>
    </form>
  );
}

export default CreateAdForm;
