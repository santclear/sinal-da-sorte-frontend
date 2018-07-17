import { NavController } from 'ionic-angular';
import { StorageService } from "../services/storage.service";
import { AdMobFree, AdMobFreeBannerConfig, } from '@ionic-native/admob-free';

export abstract class PaginaBase {
    public titulo: string;
    protected paginaAnterior: any;
    protected pbNav: NavController;
    protected pbStorage: StorageService;

    constructor() {

    }

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }

    voltar() {
        this.pbNav.setRoot(this.pbStorage.getPaginaAnterior());
    }

    mostreAnuncioBanner(admob: AdMobFree) {
 
        let bannerConfig: AdMobFreeBannerConfig = {
            // isTesting: true, // Remove in production
            autoShow: true,
            id: 'ca-app-pub-5335868077868255/5246799894'
        };
 
        admob.banner.config(bannerConfig);
 
        admob.banner.prepare().then(() => {
            // success
        }).catch(e => console.log(e));
 
    }
}
