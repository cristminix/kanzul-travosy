import { ChangeEvent, useCallback, useMemo,useRef ,useEffect} from 'react';

import {
  dataURItoBlob,
  FormContextType,
  getTemplate,
  Registry,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
  UIOptionsType,
  WidgetProps,
} from '@rjsf/utils';
// import Markdown from 'markdown-to-jsx';
import {Trash as IconTrash,Upload as IconUpload} from "react-feather" 
import {Button} from "react-bootstrap"
import {formatBytes} from "@/global/fn/formatBytes"
import {addNameToDataURL} from "@/global/fn/addNameToDataURL"
import {dataURLtoFile} from "@/global/fn/dataURLtoFile"

import {DEFAULT_DATA_URL} from  "@/config.json"

type FileInfoType = {
  dataURL?: string | null;
  name: string;
  size: number;
  type: string;
};

function processFile(file: File): Promise<FileInfoType> {
  const { name, size, type } = file;
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.onerror = reject;
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        resolve({
          dataURL: addNameToDataURL(event.target.result, name),
          name,
          size,
          type,
        });
      } else {
        resolve({
          dataURL: null,
          name,
          size,
          type,
        });
      }
    };
    reader.readAsDataURL(file);
  });
}

function processFiles(files: FileList) {
  return Promise.all(Array.from(files).map(processFile));
}

function FileInfoPreview<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({
  fileInfo,
  registry,
}: {
  fileInfo: FileInfoType;
  registry: Registry<T, S, F>;
}) {
  const { translateString } = registry;
  const { dataURL, type, name } = fileInfo;
  // console.log(fileInfo)
  // console.log({ dataURL, type, name })
  
  if (!dataURL || name === 'DEFAULT_DATA_URL_FILENAME') {
    return null;
  }
  // If type is JPEG or PNG then show image preview.
  // Originally, any type of image was supported, but this was changed into a whitelist
  // since SVGs and animated GIFs are also images, which are generally considered a security risk.
  if (type.startsWith("image/")){
    // console.log(dataURL)
    return <img src={dataURL} style={{ maxWidth: '100%' }} className='file-preview' />;
  }

  // otherwise, let users download file

  return (
    <>
      {' '}
      <a download={`preview-${name}`} href={dataURL} className='file-download'>
        {translateString(TranslatableString.PreviewLabel)}
      </a>
    </>
  );
}

function FilesInfo<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({
  filesInfo,
  registry,
  preview,
  onRemove,
  options,
  onUpload,
}: {
  filesInfo: FileInfoType[];
  registry: Registry<T, S, F>;
  preview?: boolean;
  onRemove: (index: number) => void;
  options: UIOptionsType<T, S, F>;
}) {
  // console.log(filesInfo)
  if (filesInfo.length === 0) {
    return null;
  }
  const { translateString } = registry;

  const { RemoveButton } = getTemplate<'ButtonTemplates', T, S, F>('ButtonTemplates', registry, options);
  // console.log(registry)
  return (
    <ul className='file-info'>
      {filesInfo.map((fileInfo, key) => {
        const { name, size, type } = fileInfo;
        const empty = name === 'DEFAULT_DATA_URL_FILENAME'
        const handleRemove = () => onRemove(key);
        return (
          <li key={key} className="upload-items">
            {/* upload button*/}
            <div className={`top-action-btn-container ${empty?'empty':''}`}>
              <Button title="Upload File" onClick={e=>onUpload()} size="sm" variant="primary" className="btn-upload">
                <IconUpload className="feather-sm"/> Upload File
              </Button>
            </div>
            {
              preview && 
              <div className="file-preview-container">
                <div className="file-container">
                  <FileInfoPreview<T, S, F> fileInfo={fileInfo} registry={registry} />
                </div>
                <div className="description-container">
                {!empty&&<>
                {name}({type}, {formatBytes(size)})</>}
                  
                </div>
              </div>
            }
            {/*<Button variant="danger" size="sm" onClick={handleRemove} className="btn-delete">
              <IconTrash className="feather-sm"/>
            </Button>
            */}
          </li>
        );
      })}
    </ul>
  );
}

function extractFileInfo(dataURLs: string[]): FileInfoType[] {
  return dataURLs.reduce((acc, dataURL) => {
    if (!dataURL) {
      return acc;
    }
    try {
      const { blob, name } = dataURItoBlob(dataURL);
      return [
        ...acc,
        {
          dataURL,
          name: name,
          size: blob.size,
          type: blob.type,
        },
      ];
    } catch (e) {
      // Invalid dataURI, so just ignore it.
      return acc;
    }
  }, [] as FileInfoType[]);
}

/**
 *  The `CustomFileWidget` is a widget for rendering file upload fields.
 *  It is typically used with a string property with data-url format.
 */
function CustomFileWidget<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(
  props: WidgetProps<T, S, F>
) {
  const defaultDataUrlRef = useRef(null)
  defaultDataUrlRef.current = DEFAULT_DATA_URL
  const { disabled, readonly, required, multiple, onChange, value, options, registry } = props;
  const BaseInputTemplate = getTemplate<'BaseInputTemplate', T, S, F>('BaseInputTemplate', registry, options);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }
      // Due to variances in themes, dealing with multiple files for the array case now happens one file at a time.
      // This is because we don't pass `multiple` into the `BaseInputTemplate` anymore. Instead, we deal with the single
      // file in each event and concatenate them together ourselves
      processFiles(event.target.files).then((filesInfoEvent) => {
        const newValue = filesInfoEvent.map((fileInfo) => fileInfo.dataURL);
        // console.log(newValue)
        if (multiple) {
          onChange(value.concat(newValue[0]));
        } else {
          onChange(newValue[0]);
        }
      });
    },
    [multiple, value, onChange]
  );

  const filesInfo = useMemo(() => extractFileInfo(Array.isArray(value) ? value : [value]), [value]);
  // const inputRef = useRef(null)
  
  const onUpload = ()=>{
    // console.log(inputRef)
    document.querySelector(`input[name=${props.id}]`).click()
  }
  const rmFile = useCallback(
    (index: number) => {
      if (multiple) {
        const newValue = value.filter((_: any, i: number) => i !== index);
        onChange(newValue);
      } else {
        onChange(undefined);
      }
    },
    [multiple, value, onChange]
  );
  // props.ref = inputRef
  // console.log(value)
  useEffect(()=>{

    // console.log(defaultDataUrlRef.current)
    let tmpFile = dataURLtoFile(defaultDataUrlRef.current)
    try{
      tmpFile=dataURLtoFile(value)
    }catch(e){
      console.log(`CustomFileWidget-error: value is not valid data-url`)
    }
    const defaultFiles = [tmpFile]
    // console.log(defaultFiles)
    processFiles(defaultFiles).then((filesInfoEvent) => {
      const newValue = filesInfoEvent.map((fileInfo) => fileInfo.dataURL);
      // console.log(newValue)
      if (multiple) {
        onChange(value.concat(newValue[0]));
      } else {
        onChange(newValue[0]);
      }
    });

  },[onChange,multiple,value])
  return (
    <div>
      <BaseInputTemplate 
        {...props}
        disabled={disabled || readonly}
        type='file'
        required={value ? false : required} // this turns off HTML required validation when a value exists
        onChangeOverride={handleChange}
        value={''}
        accept={options.accept ? String(options.accept) : undefined}
      />
      <FilesInfo<T, S, F>
        filesInfo={filesInfo}
        onRemove={rmFile}
        onUpload={onUpload}
        registry={registry}
        preview={options.filePreview}
        options={options}
      />
    </div>
  );
}

export default CustomFileWidget;