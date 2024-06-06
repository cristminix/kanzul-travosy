import MProfileBanner from "./m-banner/MProfileBanner"
import MKegiatanBanner from "./m-banner/MKegiatanBanner"
import MLembagaBanner from "./m-banner/MLembagaBanner"
import MGaleryBanner from "./m-banner/MGaleryBanner"
import MBeritaBanner from "./m-banner/MBeritaBanner"
import MKontakBanner from "./m-banner/MKontakBanner"

class MBanner {
	constructor(git, schema) {
		this.profile = new MProfileBanner(git, schema)
		this.kegiatan = new MKegiatanBanner(git, schema)
		this.lembaga = new MLembagaBanner(git, schema)
		this.galery = new MGaleryBanner(git, schema)
		this.berita = new MBeritaBanner(git, schema)
		this.kontak = new MKontakBanner(git, schema)
	}
}

export default MBanner