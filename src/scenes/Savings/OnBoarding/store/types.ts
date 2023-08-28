export interface DepositDetailsState {
  depositProduct: string
  agreementConfirmation: boolean
  intendedDepositAmount: number
  applicantsUKResidenceConfirmation: boolean
  privacyNotice: boolean
  success: boolean
}

export interface AddressState {
  type: string
  index: number
  selectionType: string
  addressLine1: string
  addressLine2: string
  town: string
  county: string
  postCode: string
  residenceYears: number
  residenceMonths: number
  summary: string
}

export interface PersonalDetailsState {
  flowState: string
  title: string
  firstName: string
  middleName: string
  lastName: string
  dob: string
  nationality: string
  employmentStatus: string
  addresses: Array<AddressState> | []
  phoneNumber: number
  email: string
  securityQuest1: string
  securityAnswer1: string
  securityQuest2: string
  securityAnswer2: string
  success: boolean
  securityVerficationSuccess: boolean
}

export interface AccountDetailsState {
  accountHolderOfNominatedAccount: any
  sortCode: string
  accountNumber: string
  success: boolean
}

export interface ConsentDetailsState {
  contactByPhone: boolean
  contactByEmail: boolean
  contactByPost: boolean
  productConfirmation: boolean
  tncConfirmation: boolean
  fscsConfirmation: boolean
  saveDetailsConfirmation: boolean
  success: boolean
}

export interface Session {
  sessionId: string
}

export interface alertProps {
  variants: "outlined" | "standard" | "filled"
  severitys: "error" | "warning" | "info" | "success"
  message: string
  isAlertShow: boolean
}

export interface OnBoardingState {
  activeStep: number
  status: "idle" | "loading" | "failed"
  error: string | undefined
  selectedProduct: string | null
  depositDetails: DepositDetailsState
  personalDetails: PersonalDetailsState
  accountDetails: AccountDetailsState
  consentDetails: ConsentDetailsState
  session: Session | {}
  addressFormDetails: []
  addressLookup: []
  user: {}
  alertDetails: alertProps
}
