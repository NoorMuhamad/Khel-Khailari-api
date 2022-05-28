export class CreateUserDTO {
	readonly email: string;
	readonly password: string;
	readonly firstName: string;
	readonly lastName: string;
	readonly authToken: string;
	readonly idToken: string;
	readonly role: string;
	readonly userAppSettings: JSON;
	readonly isDeleted: boolean;
	readonly connected: boolean;
	readonly customerId: string;
	readonly displayName: string;
	readonly lastAmountPaid: number;
	readonly lastInvoicePDFLink: string;
	readonly photoURL: string;
	readonly providerId: string;
	readonly oldDbUserid: string;
	readonly activePackageId: string
	readonly activePackageName: string
	readonly subscriptionId: string
	// readonly packageStartDate: string
	// readonly packageEndDate: string
}