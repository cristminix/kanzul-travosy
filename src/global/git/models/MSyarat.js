import DBGitList from '../DBGitList';

class MSyarat extends DBGitList{
	path = "web/data/pendaftaran.json"
}

class MSyaratUtama extends MSyarat {
	dataRootField = "syarat-utama"
}

class MSyaratAdministrasi extends MSyarat{
	dataRootField = "syarat-administrasi"
}

class MBiaya extends MSyarat {
	dataRootField = "biaya-pendaftaran"
}
export {
	MSyaratUtama,MSyaratAdministrasi,MBiaya
}

export default MSyarat