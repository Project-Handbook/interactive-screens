// Represents a real life person working at KTH
export class Person {
	constructor(public given_name: string,
							public family_name: string,
							public email: string,
							public kthid: string,
							public phone_number: string,
							public visiting_address: string,
							public username: string,
							public title: string,
							public image_url: string,
							public working_place: string,
							public kth_profile: string,
							public about_me: string,
							public status: boolean,
							public status_info: Object,
						 	public room: string,
							public phone_number2: string) /* Internal KTH phone */ {}
}
