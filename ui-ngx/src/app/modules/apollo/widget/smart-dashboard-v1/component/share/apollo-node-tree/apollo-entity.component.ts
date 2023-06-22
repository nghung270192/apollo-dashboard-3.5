import {PageComponent} from '@shared/components/page.component';
import {ChangeDetectorRef, Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EntityAction} from '@home/models/entity/entity-component.models';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {deepTrim} from '@core/utils';


// @dynamic
@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ApolloEntityComponent<T,P,L> extends PageComponent implements OnInit {

  entityForm: FormGroup;

  isEditValue: boolean;

  isDetailsPage = false;


  @Input()
  set isEdit(isEdit: boolean) {
    this.isEditValue = isEdit;
    this.cd.markForCheck();
    this.updateFormState();
  }

  get isEdit() {
    return this.isEditValue;
  }

  get isAdd(): boolean {
    return !!this.entity;
  }

  @Input()
  set entity(entity: T) {
    this.entity = entity;
    if (this.entityForm) {
      this.entityForm.markAsPristine();
      this.updateForm(entity);
    }
  }

  get entity(): T {
    return this.entity;
  }

  @Output()
  entityAction = new EventEmitter<EntityAction<T>>();

  protected constructor(protected store: Store<AppState>,
                        protected fb: FormBuilder,
                        protected entityValue: T,
                        protected cd: ChangeDetectorRef) {
    super(store);
    this.entityForm = this.buildForm(entityValue);
  }

  ngOnInit() {
  }

  onEntityAction($event: Event, action: string) {
    /*    const entityAction = {event: $event, action, entity: this.entity} as EntityAction<T>;
        let handled = false;
    zx
        if (!handled) {
          this.entityAction.emit(entityAction);
        }*/
  }

  updateFormState() {
    if (this.entityForm) {
      if (this.isEditValue) {
        this.entityForm.enable({emitEvent: false});
      } else {
        this.entityForm.disable({emitEvent: false});
      }
    }
  }

  entityFormValue() {
    const formValue = this.entityForm ? {...this.entityForm.getRawValue()} : {};
    return this.prepareFormValue(formValue);
  }

  prepareFormValue(formValue: any): any {
    return deepTrim(formValue);
  }

  abstract buildForm(entity: T): FormGroup;

  abstract updateForm(entity: T);
}
