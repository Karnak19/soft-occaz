import 'react-quill/dist/quill.snow.css';

import { useDescription, useTsController } from '@ts-react/form';
import { lazy, Suspense } from 'react';
// import ReactQuill from 'react-quill';

const ReactQuill = lazy(() => import('react-quill'));

function RichTextField() {
  const { field, error } = useTsController<string>();

  const { label } = useDescription();

  return (
    <div className="col-span-full col-start-1 mb-12 flex flex-col gap-1">
      <label>{label}</label>
      <Suspense fallback={<div>Loading...</div>}>
        <ReactQuill
          {...field}
          className="h-96 [&>.ql-snow.ql-container]:rounded-t-none [&>.ql-snow.ql-toolbar>*]:text-rg-100 [&>.ql-snow.ql-toolbar]:rounded-b-none [&>.ql-snow]:rounded-md [&>.ql-snow]:border-muted "
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
      </Suspense>
      {error?.errorMessage && <span className="text-red-500">{error?.errorMessage}</span>}
    </div>
  );
}

export default RichTextField;
