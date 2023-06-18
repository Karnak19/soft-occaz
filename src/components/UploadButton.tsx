import {
  UploadButton as _UploadButton,
  // UploadDropzone as _UploadDropzone
} from '@uploadthing/react';

import { OurFileRouter } from '$/app/api/uploadthing/core';

export function UploadButton({ onChange }: { onChange: (value: string | undefined) => void }) {
  return (
    <_UploadButton<OurFileRouter>
      endpoint="imageUploader"
      onClientUploadComplete={(res) => onChange(res?.[0].fileUrl)}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}

// export function UploadDropzone() {
//   return (
//     <_UploadDropzone<OurFileRouter>
//       endpoint="imageUploader"
//       onClientUploadComplete={(res) => {
//         // Do something with the response
//         console.log('Files: ', res);
//         alert('Upload Completed');
//       }}
//       onUploadError={(error: Error) => {
//         alert(`ERROR! ${error.message}`);
//       }}
//     />
//   );
// }
