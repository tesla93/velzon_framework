import { EventEmitter } from "@angular/core";

export interface IGridImportService {
    // Saving data progress API
    importProgress?: EventEmitter<number>;
    importBreak?: EventEmitter<void>;
    importSuccess?: EventEmitter<any>;
    breakImporting?(): void;

    importFile(file: File): Promise<void>;
}