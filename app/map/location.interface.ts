export enum Location_type {
		street_address,
		kth_places,
		department
}

export interface Location{
	latitude?: number;
	longitude?: number;
	buildingName: string;
	roomCode: string;
	popular_name?: string;
	streetAddress: string;
	streetNumber?: string;
	roomType?: string;
	zipCode?: string;
	floor?: string;
	location_type: Location_type;
}
