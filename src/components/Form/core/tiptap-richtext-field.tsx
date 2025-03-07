import type { HTMLContent } from '@tiptap/react';
import { useDescription, useTsController } from '@ts-react/form';
import MinimalTiptapEditor from './tiptap/minimal-tiptap';

export function TipTapRichTextField() {
  const { field, error } = useTsController<HTMLContent>();

  const { label } = useDescription();

  return (
    <div className="col-span-full col-start-1 mb-12 flex flex-col gap-1">
      <label>{label}</label>
      <MinimalTiptapEditor
        output="html"
        editorContentClassName="overflow-auto h-full"
        editorClassName="px-5 py-4 h-full"
        {...field}
        editable
        value={field.value ?? ''}
        throttleDelay={1000}
        onChange={(c) => {
          if (c && typeof c === 'string') {
            field.onChange(c);
          }
        }}
      />

      {/* <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense> */}
      {error?.errorMessage && <span className="text-red-500">{error?.errorMessage}</span>}
    </div>
  );
}
