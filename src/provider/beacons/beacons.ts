export class BeaconsDBProvider{
	protected beacons: Array<{identifier: string, uuid?: string, major?: number, minor?: number}>;
	
	constructor(){
		this.beacons = [
			{
				identifier: "D9:01:32:1E:DE:3A",
				uuid: "FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
				major: 10035,
				minor: 56498,
			},
			{
				identifier: "F6:A3:A5:77:2F:AC",
				uuid: "FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
				major: 10035,
				minor: 56498,
			},
			{
				identifier: "88:4A:EA:6C:34:E8",
			},
			{
				identifier: "50:8C:B1:75:23:9D",
			},
		];
	}
}