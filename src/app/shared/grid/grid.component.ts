import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { GridColumn } from './classes/grid-column';
import { PaginationModel } from './classes/pagination.model';
import { DisplayingMode } from './enums/displaying-mode';
import { NgbdListViewSortableHeaderDirective, SortEvent } from '../directives/list-view-sortable.directive';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent<TDataItem> implements OnChanges {


  total!: Observable<number>;
  startIndex = 1;
  endIndex = 1;
  _page = 1;
  checkedItems: TDataItem[] = []
  @ViewChildren(NgbdListViewSortableHeaderDirective) headers!: QueryList<NgbdListViewSortableHeaderDirective>;
  @ViewChild("deleteModal", { static: false }) deleteModal!: any;
  @ViewChild("uploadModal", { static: false }) uploadModal!: any;
  public get _displayingModeEnum(): any { return DisplayingMode; }
  @Input() showSpinner = false;
  @Input() isLite = false;
  @Input() isLiteAndStripped = false;
  @Input() headerNeeded = true;
  @Input() buttonsNeeded = true
  @Input() itemName = 'Item';
  @Input() public totalRecords?: number = 0;
  @Input() public columns!: GridColumn[];
  @Input() public actionsColumnWidth = 100;
  @Input() public creationLink!: string;
  @Input() itemsPerPage = [10, 20, 30, 50];
  @Input() public importEnabled!: boolean;
  @Input() public exportEnabled!: boolean;
  @Input() public importUrl = 'import-url';
  @Input() resetPageBasedOnTotalRecords = false
  @Input() dataItems?: TDataItem[]
  @Input() nowrap?: boolean = true;
  @Output() reloadData = new EventEmitter<any>();
  @Output() deleteDataEvent = new EventEmitter<any>();
  @Output() openModalEvent = new EventEmitter<any>();
  @Input() statusClass: (args: any) => string = () => 'text-uppercase badge bg-success-subtle text-success';

  allSelected = false;
  pagination: PaginationModel = { page: this.page, pageSize: this.itemsPerPage[0], sortColumn: '', sortOrder: '' }

  constructor(
    private translate: TranslateService,
    private modalService: NgbModal,
    private router: Router,
    public elementRef: ElementRef
  ) { }

  
  selectCheckboxes() {
    this.allSelected = !this.allSelected;
    if(this.allSelected)
      this.checkedItems = this.dataItems ?? []
    else
      this.checkedItems = []
  }
  changeSymbol(event: any){
    const currentSymbol = event.target.innerHTML;
    switch(currentSymbol){
      case "%"  :{
        event.target.innerHTML = "$"
        event.target.classList.remove('bg-info')
        event.target.classList.add('bg-success')
        break;
      }
      case "$":{
        event.target.innerHTML = "%"
        event.target.classList.remove('bg-success')
        event.target.classList.add('bg-info')
        break;
      }
    }
  }
  getCheckedItems() {
    return this.checkedItems;
  }
  async ngOnChanges(changes: SimpleChanges) {
    if (changes['itemsPerPage']) {
      this.pagination.pageSize = this.itemsPerPage[0];
    }

    if (changes['totalRecords']) {

      this.total = of(this.totalRecords ?? 0);
    }
    this.managePagination()
  }
  toggleSelection(event:any, item: any) {
    const checked = event.target.checked;
    if (checked) {
      this.checkedItems.push(item)
    } else {
      this.checkedItems = this.checkedItems.filter(x => x !== item)
    }
  }

  onClickCreate() {
    if (this.creationLink) {
      this.router.navigateByUrl(this.creationLink);
    }
    else {
      this.openModalEvent.emit();
    }
  }

  async onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.pagination.sortColumn = column.toString();
    this.pagination.sortOrder = direction.toString();
    this.reloadDataItems();
  }


  managePagination() {
    const total = this.dataItems?.length ?? 0;
    this.startIndex = total > 0 ? (this.page - 1) * this.pagination.pageSize + 1 : 0;
    this.endIndex = (this.page - 1) * this.pagination.pageSize + total;
  }

  private _setPage(page?: number) {
    if (page !== this._page) {
      this._page = page ?? 1;
      this.pagination.page = this._page;
      this.reloadDataItems();
    }
  }

  public _onUpload(event: { files: File[] }): void {
    if (!event.files || !event.files.length) {
      throw new Error("Grid data import: there are no file for import.");
    }
  }

  reloadDataItems() {
    this.reloadData.emit(this.pagination)
  }

  deleteId: any;
  confirmDelete(id: any) {
    this.deleteId = id;
    this.modalService.open(this.deleteModal, { centered: true });
  }

  deleteData(key: any) {
    if (key) {
      this.deleteDataEvent.emit(key);
    }
  }

  set page(page: number) { this._setPage(page); }
  get page() { return this._page }



  getCellValue(rowData: TDataItem, column?: string): string {
    return rowData[column as keyof TDataItem] as string;
  }

  getDataKey(rowData: TDataItem) {
    const propertyKey = this.columns?.find((item) => {
      return item.isKey
    })?.field ?? 'id';
    return rowData[propertyKey as keyof TDataItem] ?? '';
  }

  onClickImport() {
    this.modalService.open(this.uploadModal, { centered: true });
  }

  onClickExport() {
    //ToDo
  }

  onUploadError(event: any) {
    Swal.fire({
      title: this.translate.instant('GENERAL.ATTACH.ERRORMSG'), //'Error attaching file!',
      icon: 'error',
      timer: 2000,
      timerProgressBar: true,
    })
  }

  onUploadSuccess(event: any) {
    Swal.fire({
      title: this.translate.instant('GENERAL.ATTACH.SUCCESSMSG'),
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
    })
    this.reloadDataItems();
  }

  onInit(event: any) {
    event.options.url = this.importUrl 
  }
}
