import DBGitSingle from '../DBGitSingle';

class MProfile extends DBGitSingle{
	path="web/data/profile.json"
}

class MShortProfile extends MProfile{
	dataRootField="short"
}

class MFullProfile extends MProfile{
	dataRootField="full"
}

export {
	MShortProfile, MFullProfile
}
export default MProfile