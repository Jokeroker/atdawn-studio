/*
	At Dawn Studio — deployment configuration
	=========================================
	This is the ONLY file you need to edit when deploying.

	adminPasswordHash:
		SHA-256 hex of the producer/admin password.
		The default password is:  atdawn2026
		To change it, open admin.html -> Settings -> "Change admin password",
		which generates the new hash for you to paste below.

	vdoPath:
		Path from the /studio/ folder to the VDO.Ninja install.
		"../" is correct when /studio/ lives inside the VDO.Ninja web root.
		You may also use an absolute URL (e.g. "https://vdo.yourdomain.com/").
*/
window.STUDIO_CONFIG = {
	brandName: "At Dawn Studio",
	tagline: "Remote Guest Green Room & Broadcast Control",
	vdoPath: "../",

	// SHA-256 of the admin password (default password: "atdawn2026")
	adminPasswordHash: "7f61db09ee474ee3a306255503055a4e7f995466490eba8181562b6f080dde54",

	// Defaults used the first time the dashboard runs (editable in Settings)
	defaults: {
		eventName: "At Dawn Live",
		greenRoom: "atdawnGREEN",
		mainRoom: "atdawnMAIN",
		roomPassword: "dawnpass", // shared by both rooms (required for transfers to work)
		requirePasswordEntry: false // if true, guests must type the room password to join
	}
};
