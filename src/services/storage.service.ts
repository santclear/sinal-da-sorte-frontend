import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { ContaLocalDTO } from "../dtos/conta-local.dto";

@Injectable()
export class StorageService {

    getContaLocal() : ContaLocalDTO {
        let usr = localStorage.getItem(STORAGE_KEYS.contaLocal);
        if (usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }
    }

    setContaLocal(obj : ContaLocalDTO) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.contaLocal);
        } else {
            localStorage.setItem(STORAGE_KEYS.contaLocal, JSON.stringify(obj));
        }
    }
}