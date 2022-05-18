import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'oms-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true,
    },
  ],
})
export class UploadFileComponent implements OnInit, ControlValueAccessor {
  @Input() formControlName!: string;
  @ViewChild('previewModal') previewModal!: ElementRef;
  id: string = `upload_file_${Math.floor(Math.random() * 1000)}`;
  control!: FormControl;
  fileSelected!: any;
  fileName: string = '';
  error: boolean = false;
  // progress: number = 0;
  // isReading: boolean = false;
  private _value: any;
  onChange = (_: any) => {};
  onTouched = () => {};

  public get value() {
    return this._value;
  }

  public set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  constructor(
    @Optional() private controlContainer: ControlContainer,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    console.log(this.controlContainer);
    if (this.controlContainer && !!this.formControlName) {
      this.control = this.controlContainer.control?.get(
        this.formControlName
      ) as FormControl;
    }
    console.log(this);
  }

  writeValue(val: any): void {
    this.value = val;
  }

  onInputChange(ev: any) {
    const file = ev.target.files[0];
    this.setFile(file);
    this.writeValue(ev.target.files[0]);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  onUpload(ev: any) {
    const file = ev.target.files[0];
    this.setFile(file);
  }

  // onProgess(file: any) {
  //   const xhr: XMLHttpRequest = new XMLHttpRequest();
  //   const data = new FormData();
  //   data.append('file', file);
  //   xhr.upload.addEventListener(
  //     'progress',
  //     this.progressHandler.bind(this),
  //     false
  //   );
  //   xhr.onloadstart = () => {
  //     this.isReading = true;
  //     this.progress = 0;
  //   }
  //   xhr.addEventListener('load', this.completeHandler.bind(this), false);
  //   xhr.addEventListener('error', this.errorHandler.bind(this), false);
  //   xhr.addEventListener('abort', this.abortHandler.bind(this), false);
  //   xhr.open('POST', '/upload', true);
  //   xhr.send(data);
  // }

  // progressHandler(event: any) {
  //   this.progress = Math.round((event.loaded / event.total) * 100);
  // }

  // completeHandler(event: any) {
  //   setTimeout(() => {
  //     this.isReading = false;
  //   }, 400);
  // }

  // errorHandler(event: any) {
  //   this.error = true;
  // }

  // abortHandler(event: any) {}

  setFile(file: any) {
    this.fileName = file.name;
    this.fileSelected = this.domSanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(file)
    );
  }

  onPreview() {
    (this.previewModal.nativeElement as HTMLElement).style.display = 'block';
  }

  onClose() {
    (this.previewModal.nativeElement as HTMLElement).classList.add(
      'file-modal--hide'
    );
    setTimeout(() => {
      (this.previewModal.nativeElement as HTMLElement).style.display = 'none';
      (this.previewModal.nativeElement as HTMLElement).classList.remove(
        'file-modal--hide'
      );
    }, 200);
  }

  onRemove(id: string) {
    this.fileSelected = '';
    if (this.formControlName) {
      (<HTMLInputElement>document.getElementById(id)).value = '';
      this.control.setValue('');
    } else {
      this.value = '';
      (<HTMLInputElement>document.getElementById(id)).value = '';
    }
  }
}
