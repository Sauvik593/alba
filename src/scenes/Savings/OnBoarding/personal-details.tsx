import * as React from "react"
import { CommonNextButton } from "./components/common-next-button"
import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { useNavigate } from "react-router-dom"
import { selectStep } from "./store"
import { useEffect, useState } from "react"
import infoIcon from "src/resources/images/warning.svg"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  FormControlLabel,
  Grid,
  FormGroup,
  Button,
} from "@mui/material"
import { KeyboardArrowDown } from "@mui/icons-material"
import {
  postPersonalDetails,
  getAddressLookup,
  saveAddressFormDetails,
} from "./store/index"
import {
  getAddressFormDetails,
  getDepositSuccess,
  getLookupAddresses,
  getPersonalDetails,
  getPersonalDetailsSuccess,
} from "./store/selectors"
import dayjs from "dayjs"
import {
  employmentStatusList,
  nationalityList,
  securityQuestionsList,
  titleList,
} from "src/resources/form/data/staticList"
import {
  useForm,
  getEndYear,
  formatDate,
} from "../OnBoarding/components/helpers"
import { AddressState } from "./store/types"

export const PersonalDetails: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const personalDetails = useAppSelector(getPersonalDetails)
  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: {
      title: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
      firstName: {
        required: {
          value: true,
          message: "This field is required",
        },
        pattern: {
          value: /^[A-Za-z]+[A-Za-z\s-']*[A-Za-z]+$/,
          message:
            "Field can only contain letters of the alphabet, hyphens(-), apostrophes (') and spaces",
        },
        custom: {
          isValid: (value: string) => value.length < 30,
          message: "Name can be maximum 30 characters",
        },
      },
      middleName: {
        required: {
          value: false,
          message: "This field is required",
        },
        pattern: {
          value: /^[A-Za-z]+[A-Za-z\s-']*[A-Za-z]+$/,
          message:
            "Field can only contain letters of the alphabet, hyphens(-), apostrophes (') and spaces",
        },
        custom: {
          isValid: (value: string) => value.length < 30,
          message: "Name can be maximum 30 characters",
        },
      },
      lastName: {
        required: {
          value: true,
          message: "This field is required",
        },
        pattern: {
          value: /^[A-Za-z]+[A-Za-z\s-']*[A-Za-z]+$/,
          message:
            "Field can only contain letters of the alphabet, hyphens(-), apostrophes (') and spaces",
        },
        custom: {
          isValid: (value: string) => value.length < 30,
          message: "Name can be maximum 30 characters",
        },
      },
      nationality: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
      employmentStatus: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
      dob: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
      email: {
        required: {
          value: true,
          message: "This field is required",
        },
        pattern: {
          value:
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
          message: "Please enter a valid email ID",
        },
      },
      confirmEmail: {
        required: {
          value: true,
          message: "This field is required",
        },
        pattern: {
          value:
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
          message: "Please enter a valid email ID",
        },
        custom: {
          isValid: (value: string) => value === data.email,
          message:
            "Email & Confirm Email do not match. Please make sure they are the same",
        },
      },
      securityQuestion1: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
      securityAnswer1: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
      securityQuestion2: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
      securityAnswer2: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
      phoneNumber: {
        required: {
          value: true,
          message: "This field is required",
        },
        pattern: {
          value: /^[0-9\s+]+$/,
          message: "Please enter valid phone number",
        },
      },
    },
    onSubmit: () => handleSubmitClick(),
    initialValues: {
      title: personalDetails.title ? personalDetails.title : "",
      firstName: personalDetails.firstName ? personalDetails.firstName : "",
      middleName: personalDetails.middleName ? personalDetails.middleName : "",
      lastName: personalDetails.lastName ? personalDetails.lastName : "",
      dob: personalDetails.dob ? personalDetails.dob : "",
      nationality: personalDetails.nationality
        ? personalDetails.nationality
        : "",
      employmentStatus: personalDetails.employmentStatus
        ? personalDetails.employmentStatus
        : "",
      email: personalDetails.email ? personalDetails.email : "",
      confirmEmail: personalDetails.confirmEmail
        ? personalDetails.confirmEmail
        : "",
      securityQuestion1: personalDetails.securityQuestion1
        ? personalDetails.securityQuestion1
        : "",
      securityAnswer1: personalDetails.securityAnswer1
        ? personalDetails.securityAnswer1
        : "",
      securityQuestion2: personalDetails.securityQuestion2
        ? personalDetails.securityQuestion2
        : "",
      securityAnswer2: personalDetails.securityAnswer2
        ? personalDetails.securityAnswer2
        : "",
      phoneNumber: personalDetails.phoneNumber
        ? personalDetails.phoneNumber
        : "",
    },
  })

  const [lookupAddressIndex, setLookupAddressIndex] = useState(0)

  const handleSecurityQuestion = (idx: number, value: number) => {
    securityQuestionsList.forEach((question) =>
      question.usedIn === value ? (question.usedIn = 0) : null,
    )
    securityQuestionsList[idx].usedIn = value
  }

  const personalDetailsSuccess = useAppSelector(getPersonalDetailsSuccess)

  let eachAddress = {
    type: "",
    selectionType: "",
    addressLine1: "",
    addressLine2: "",
    isSelected: false,
    town: "",
    county: "",
    postCode: "",
    residenceYears: 0,
    residenceMonths: 0,
    summary: "",
    showManualAddress: false,
    showSelectAddress: false,
    showSelectAddressBlock: false,
    showAddressControls: false,
    showAddressStay: false,
    showAddress: false,
    selectAddresses: [],
    selectedAddressIndex: 0,
    searchPostcode: "",
  }
  const savedAddressDetails = useAppSelector(getAddressFormDetails)
  const [addresses, setAddresses] = useState(
    savedAddressDetails && savedAddressDetails.length
      ? JSON.parse(JSON.stringify(savedAddressDetails))
      : new Array(eachAddress),
  )
  let lookupAddress = useAppSelector(getLookupAddresses)

  useEffect(() => {
    dispatch(selectStep(1))
  }, [dispatch])

  useEffect(() => {
    //dispatch(selectStep(e ? 2 : 0));
    //navigate(e ? "../account-details" : "/savings/deposit-details")
    dispatch(selectStep(1))
    if (personalDetailsSuccess && isSubmit) {
      navigate("/savings/account-details")
    }
  }, [personalDetailsSuccess])

  useEffect(() => {
    if (lookupAddress.length) {
      addresses[lookupAddressIndex]["selectAddresses"] = lookupAddress
      addresses[lookupAddressIndex]["showSelectAddressBlock"] = true
      addresses[lookupAddressIndex]["showSelectAddress"] = true
      addresses[lookupAddressIndex]["showAddressStay"] = true
      addresses[lookupAddressIndex]["showAddressControls"] = true
      addresses[lookupAddressIndex]["selectedAddressIndex"] = 0
      addresses[lookupAddressIndex]["isSelected"] = true
      setAddresses([...addresses])
    }
  }, [lookupAddress])

  const updateAddress = (addressIndex, selectedIndex) => {
    addresses[addressIndex]["selectedAddressIndex"] = selectedIndex
    addresses[addressIndex].selectionType = "selected"
    addresses[addressIndex].isSelected = true
    setAddresses([...addresses])
  }

  const showManual = (addressesIndex) => {
    let tmpAddresses = addresses
    tmpAddresses[addressesIndex]["showManualAddress"] = true
    tmpAddresses[addressesIndex]["showSelectAddress"] = false
    tmpAddresses[addressesIndex]["selectAddresses"] = []
    tmpAddresses[addressesIndex]["selectedAddressIndex"] = 0
    tmpAddresses[addressesIndex].selectionType = "manual"
    tmpAddresses[addressesIndex].isSelected = false
    setAddresses([...tmpAddresses])
  }

  const resetAddress = (addressesIndex) => {
    addresses[addressesIndex] = eachAddress
    setAddresses([...addresses])
  }

  const numberRange = (start: number, end: number) => {
    return new Array(end - start).fill().map((d, i) => i + start)
  }
  const years = numberRange(1, 51)
  const months = numberRange(1, 12)

  const checkAddressEligibility = (addressesIndex) => {
    let yearsCount = 0
    let monthsCount = 0
    addresses.map((eachAddress) => {
      yearsCount += eachAddress.residenceYears
      monthsCount += eachAddress.residenceMonths
    })

    if (yearsCount * 12 + monthsCount < 36) {
      if (addresses[addressesIndex + 1] === undefined) {
        addresses.push(eachAddress)
        setAddresses([...addresses])
      }
    } else {
      if (addresses[addressesIndex + 1] !== undefined) {
        let validAddresses = addresses.slice(0, addressesIndex + 1)
        setAddresses([...validAddresses])
      }
    }
  }
  const updateYears = (addressesIndex: number, v: any) => {
    addresses[addressesIndex]["residenceYears"] = v
    setAddresses([...addresses])
    checkAddressEligibility(addressesIndex)
    setAddressErrorVariable(addressesIndex, "residenceYears", false)
  }

  const updateMonths = (addressesIndex, v) => {
    addresses[addressesIndex]["residenceMonths"] = v
    setAddresses([...addresses])
    checkAddressEligibility(addressesIndex)
    setAddressErrorVariable(addressesIndex, "residenceMonths", false)
  }

  const handleFindAddress = (addressIndex, postcode) => {
    addresses[addressIndex] = eachAddress
    setLookupAddressIndex(addressIndex)
    setAddresses([...addresses])
    dispatch(getAddressLookup(postcode))
    setSearchPostcodeError(false)
    setAddressError([...addressError, eachAddressError])
  }

  const updateAddressFields = (addressesIndex, key, value) => {
    addresses[addressesIndex][key] = value
    setAddresses([...addresses])
  }

  const [isSubmit, setIsSubmit] = useState(false)
  const [searchPostcodeError, setSearchPostcodeError] = useState(false)
  const prepareAPIAddress = () => {
    let formattedAddresses = []
    addresses.map((addr, index) => {
      console.log(addr)
      formattedAddresses.push({
        type: index === 0 ? "current" : "previous",
        index: index,
        selectionType: addr.isSelected ? "selected" : "manual",
        addressLine1: addr.isSelected
          ? addr.selectAddresses[addr.selectedAddressIndex].addressLine1
          : addr.addressLine1,
        addressLine2: addr.isSelected
          ? addr.selectAddresses[addr.selectedAddressIndex].addressLine2
          : addr.addressLine2,
        town: addr.isSelected
          ? addr.selectAddresses[addr.selectedAddressIndex].postTown
          : addr.town,
        county: addr.isSelected
          ? addr.selectAddresses[addr.selectedAddressIndex].county
          : addr.county,
        postCode: addr.isSelected
          ? addr.selectAddresses[addr.selectedAddressIndex].postCode
          : addr.postCode,
        residenceYears: addr.residenceYears,
        residenceMonths: addr.residenceMonths,
        summary: addr.isSelected
          ? addr.selectAddresses[addr.selectedAddressIndex].summaryLine
          : "",
      })
    })

    return formattedAddresses
  }

  const handleSubmitClick = () => {
    console.log("submited ")
    dispatch(saveAddressFormDetails(addresses))
    setIsSubmit(true)
    dispatch(
      postPersonalDetails({
        ...data,
        flowState: "initial_post",
        dob: formatDate(data.dob, "yyyy-mm-dd"),
        addresses: prepareAPIAddress(),
      }),
    )
  }
  const handleClick = (isNextClick: boolean) => {
    if (isNextClick) {
      var pagebutton = document.getElementById("submitButton")
      pagebutton?.click()
      addAddressValidation()
    } else navigate("/savings/deposit-details")
  }

  const addAddressValidation = () => {
    addresses.forEach((address: any, index: number) => {
      if (addressError.length - 1 < index) {
        setAddressError([...addressError, eachAddress])
      }
      if (address.isSelected) {
        if (address["residenceYears"] === 0) {
          setAddressErrorVariable(index, "residenceYears", true)
        }
        if (address["residenceMonths"] === 0) {
          setAddressErrorVariable(index, "residenceMonths", true)
        }
      } else {
        setSearchPostcodeError(
          address.selectionType === "manual" ? false : true,
        )
      }
      if (address.selectionType === "manual") {
        manualAddressValidation(index, address)
      }
    })
  }

  const manualAddressValidation = (index, address) => {
    setAddressErrorVariable(
      index,
      "addressLine1",
      address.addressLine1 === "" ? true : false,
    )
    setAddressErrorVariable(index, "town", address.town === "" ? true : false)
    setAddressErrorVariable(
      index,
      "county",
      address.county === "" ? true : false,
    )
    setAddressErrorVariable(
      index,
      "postCode",
      address.postCode === "" ? true : false,
    )
  }
  const setAddressErrorVariable = (
    index: number,
    key: string,
    value: boolean,
  ) => {
    let addressTemp = addressError
    addressTemp[index][key] = value
    setAddressError([...addressTemp])
  }

  let eachAddressError = {
    type: false,
    selectionType: false,
    addressLine1: false,
    addressLine2: false,
    town: false,
    county: false,
    postCode: false,
    residenceYears: false,
    residenceMonths: false,
    summary: false,
    searchPostcode: false,
  }
  const [addressError, setAddressError] = useState([eachAddressError])

  return (
    <Box id="personal-details">
      <Box className="title" sx={{ marginBottom: "-12px" }}>
        Your information
      </Box>
      <form>
        <FormGroup>
          <FormControl
            fullWidth
            required
            className={errors.title ? "error" : ""}
          >
            <FormLabel className="label">Title</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={data.title}
            >
              {titleList.map((titleItem, index) => (
                <FormControlLabel
                  key={index}
                  className="radio"
                  value={titleItem}
                  control={
                    <Radio
                      onClick={(el) =>
                        handleChange("title", { target: { value: titleItem } })
                      }
                    />
                  }
                  label={titleItem}
                />
              ))}
            </RadioGroup>
            {errors.title && <p className="msg">{errors.title}</p>}
          </FormControl>
        </FormGroup>
        <Grid container columnSpacing={5}>
          <Grid item xs={12} sm={4}>
            <FormGroup>
              <FormControl
                fullWidth
                variant="standard"
                required
                className={errors.firstName ? "error" : ""}
              >
                <FormLabel className="label" htmlFor="firstName">
                  First name
                </FormLabel>
                <Input
                  required={true}
                  error
                  name="firstName"
                  value={data.firstName}
                  disableUnderline
                  className="input"
                  id="firstName"
                  onInput={(el) => handleChange("firstName", el)}
                />
                {errors.firstName && <p className="msg">{errors.firstName}</p>}
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormGroup>
              <FormControl
                fullWidth
                variant="standard"
                className={errors.middleName ? "error" : ""}
              >
                <FormLabel className="label" htmlFor="middleName">
                  Middle name
                </FormLabel>
                <Input
                  value={data.middleName}
                  disableUnderline
                  className="input"
                  id="middleName"
                  onInput={(el) => handleChange("middleName", el)}
                />
                {errors.middleName && (
                  <p className="msg">{errors.middleName}</p>
                )}
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormGroup>
              <FormControl
                fullWidth
                variant="standard"
                required
                className={errors.lastName ? "error" : ""}
              >
                <FormLabel className="label" htmlFor="lastName">
                  Last name
                </FormLabel>
                <Input
                  value={data.lastName}
                  disableUnderline
                  className="input"
                  id="lastName"
                  onInput={(el) => handleChange("lastName", el)}
                />
                {errors.lastName && <p className="msg">{errors.lastName}</p>}
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormGroup>
              <FormControl
                fullWidth
                variant="standard"
                required
                className={errors.dob ? "error" : ""}
              >
                <FormLabel className="label">Date of birth</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="input"
                    maxDate={dayjs(getEndYear(18))}
                    minDate={dayjs(getEndYear(120))}
                    format="DD-MM-YYYY"
                    slots={{ openPickerIcon: CalendarMonthIcon }}
                    sx={{ border: 0, padding: "0 !important" }}
                    value={dayjs(data.dob)}
                    onChange={(newVal) =>
                      handleChange("dob", {
                        target: { value: dayjs(newVal).toString() },
                      })
                    }
                  />
                </LocalizationProvider>
                {errors.dob && <p className="msg">{errors.dob}</p>}
              </FormControl>
            </FormGroup>
          </Grid>
        </Grid>
        <Grid container columnSpacing={5}>
          <Grid item xs={12} sm={6}>
            <FormGroup>
              <FormControl
                fullWidth
                required
                className={errors.nationality ? "error" : ""}
              >
                <FormLabel className="label">
                  Please indicate your nationality from the country list below
                </FormLabel>
                <Select
                  className="input"
                  variant="standard"
                  disableUnderline
                  IconComponent={KeyboardArrowDown}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  placeholder={"choose one"}
                  value={data.nationality}
                  onChange={(el) => handleChange("nationality", el)}
                >
                  <MenuItem disabled value={0}>
                    Choose one
                  </MenuItem>
                  {nationalityList.map((country: any, index) => (
                    <MenuItem value={country.code} key={index}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.nationality && (
                  <p className="msg">{errors.nationality}</p>
                )}
              </FormControl>
            </FormGroup>
          </Grid>
        </Grid>
        <Grid container columnSpacing={5}>
          <Grid item xs={12} sm={6}>
            <FormGroup>
              <FormControl
                fullWidth
                required
                className={errors.employmentStatus ? "error" : ""}
              >
                <FormLabel className="label">Employment Status</FormLabel>
                <Select
                  className="input"
                  variant="standard"
                  disableUnderline
                  IconComponent={KeyboardArrowDown}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  placeholder={"choose one"}
                  value={data.employmentStatus}
                  onChange={(el) => handleChange("employmentStatus", el)}
                >
                  <MenuItem disabled value={0}>
                    Choose one
                  </MenuItem>
                  {employmentStatusList.map((emp: any, index) => (
                    <MenuItem value={emp.code} key={index}>
                      {emp.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.employmentStatus && (
                  <p className="msg">{errors.employmentStatus}</p>
                )}
              </FormControl>
            </FormGroup>
          </Grid>
        </Grid>
        <Box className="title">Your address details</Box>
        <Grid container columnSpacing={5}>
          <Grid item xs={12} sm={4}>
            <Box className="info">
              <img src={infoIcon} alt="info icon" />
              We require up to 3 years of address details
            </Box>
          </Grid>
        </Grid>
        {addresses.map((address, adKey) => (
          <div key={adKey}>
            <Grid container columnSpacing={5}>
              <Grid item xs={8} sm={4}>
                <FormGroup>
                  <FormControl fullWidth required>
                    <FormLabel className="label">UK Postcode</FormLabel>
                    <Input
                      value={addresses[adKey]["searchPostcode"]}
                      disableUnderline
                      className="input"
                      placeholder="SL6 8DT"
                      onInput={(el) =>
                        updateAddressFields(
                          adKey,
                          "searchPostcode",
                          el.target.value,
                        )
                      }
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Grid item xs={4} sm={2} className="find-address">
                <Button
                  onClick={() =>
                    handleFindAddress(adKey, addresses[adKey]["searchPostcode"])
                  }
                >
                  Find address
                </Button>
              </Grid>
            </Grid>
            {address.showAddressControls ? (
              <Grid container columnSpacing={5}>
                <Grid item xs={12} sm={6}>
                  {address.showSelectAddress ? (
                    <FormGroup>
                      <FormControl fullWidth required>
                        <FormLabel className="label">
                          Please select your address from the list below
                        </FormLabel>
                        <Select
                          className="input"
                          variant="standard"
                          disableUnderline
                          IconComponent={KeyboardArrowDown}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          placeholder={"choose one"}
                          value={address.selectedAddressIndex}
                          onChange={(el) =>
                            updateAddress(adKey, el.target.value)
                          }
                        >
                          {/*{!address.selectAddresses.length ? (*/}
                          <MenuItem disabled value={0}>
                            Choose one
                          </MenuItem>
                          {/*) : null}*/}
                          {address.selectAddresses.map((address, key) => (
                            <MenuItem key={key} value={key}>
                              {address.summaryLine}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </FormGroup>
                  ) : null}
                  {address.showSelectAddressBlock ? (
                    <Grid
                      container
                      columnSpacing={3}
                      sx={{
                        justifyContent: "flex-end",
                        marginTop: "24px !important",
                      }}
                    >
                      {address.showSelectAddress ? (
                        <Grid
                          item
                          xs={6}
                          lg={5}
                          xl={4}
                          className="find-address"
                        >
                          <Button onClick={() => showManual(adKey)}>
                            Input Address Manually
                          </Button>
                        </Grid>
                      ) : null}
                      <Grid item xs={6} lg={5} xl={4} className="find-address">
                        <Button onClick={() => resetAddress(adKey)}>
                          Reset Address Search
                        </Button>
                      </Grid>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
            ) : null}
            {address.showManualAddress ? (
              <>
                <Grid container columnSpacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormGroup>
                      <FormControl
                        fullWidth
                        required
                        className={
                          addressError[adKey].addressLine1 ? "error" : ""
                        }
                      >
                        <FormLabel className="label">Address Line 1</FormLabel>
                        <Input
                          value={address.addressLine1}
                          className="input"
                          disableUnderline
                          onInput={(el) =>
                            updateAddressFields(
                              adKey,
                              "addressLine1",
                              el.target.value,
                            )
                          }
                        />
                        {addressError[adKey].addressLine1 ? (
                          <p className="msg">This field is required</p>
                        ) : null}
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormGroup>
                      <FormControl fullWidth>
                        <FormLabel className="label">Address Line 2</FormLabel>
                        <Input
                          value={address.addressLine2}
                          className="input"
                          disableUnderline
                          onInput={(el) =>
                            updateAddressFields(
                              adKey,
                              "addressLine2",
                              el.target.value,
                            )
                          }
                        />
                      </FormControl>
                    </FormGroup>
                  </Grid>
                </Grid>
                <Grid container columnSpacing={5}>
                  <Grid item xs={12} sm={4}>
                    <FormGroup>
                      <FormControl
                        fullWidth
                        required
                        className={addressError[adKey].town ? "error" : ""}
                      >
                        <FormLabel className="label">Town / City</FormLabel>
                        <Input
                          value={address.town}
                          className="input"
                          disableUnderline
                          onInput={(el) =>
                            updateAddressFields(adKey, "town", el.target.value)
                          }
                        />
                        {addressError[adKey].town ? (
                          <p className="msg">This field is required</p>
                        ) : null}
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    className={addressError[adKey].county ? "error" : ""}
                  >
                    <FormControl fullWidth required>
                      <FormLabel className="label">County</FormLabel>
                      <Input
                        error
                        value={address.county}
                        className="input"
                        disableUnderline
                        onInput={(el) =>
                          updateAddressFields(adKey, "county", el.target.value)
                        }
                      />
                      {addressError[adKey].county ? (
                        <p className="msg">This field is required</p>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    className={addressError[adKey].postCode ? "error" : ""}
                  >
                    <FormGroup>
                      <FormControl fullWidth required>
                        <FormLabel className="label">Postcode</FormLabel>
                        <Input
                          value={address.postCode}
                          className="input"
                          disableUnderline
                          onInput={(el) =>
                            updateAddressFields(
                              adKey,
                              "postCode",
                              el.target.value,
                            )
                          }
                        />
                        {addressError[adKey].postCode ? (
                          <p className="msg">This field is required</p>
                        ) : null}
                      </FormControl>
                    </FormGroup>
                  </Grid>
                </Grid>
              </>
            ) : null}
            {address.showAddressStay ? (
              <Box sx={{ flexGrow: 1 }}>
                <Grid>
                  <FormGroup>
                    <FormLabel className="label">
                      How long have you lived at this address?
                    </FormLabel>
                    <Grid container item xs={12} sm={8} columnSpacing={5}>
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          fullWidth
                          required
                          className={
                            addressError[adKey]?.residenceYears ? "error" : ""
                          }
                        >
                          <Select
                            className="input"
                            variant="standard"
                            disableUnderline
                            fullWidth
                            IconComponent={KeyboardArrowDown}
                            inputProps={{ "aria-label": "Without label" }}
                            value={address["residenceYears"]}
                            onChange={(el) =>
                              updateYears(adKey, el.target.value)
                            }
                          >
                            <MenuItem disabled value={0}>
                              Select number of years
                            </MenuItem>
                            {years.map((y, key) => (
                              <MenuItem key={key} value={y}>
                                {y}
                              </MenuItem>
                            ))}
                          </Select>
                          {addressError[adKey]?.residenceYears ? (
                            <p className="msg">This field is required</p>
                          ) : null}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          fullWidth
                          required
                          className={
                            addressError[adKey]?.residenceMonths ? "error" : ""
                          }
                        >
                          <Select
                            className="input"
                            variant="standard"
                            disableUnderline
                            fullWidth
                            IconComponent={KeyboardArrowDown}
                            inputProps={{ "aria-label": "Without label" }}
                            value={address["residenceMonths"]}
                            onChange={(el) =>
                              updateMonths(adKey, el.target.value)
                            }
                          >
                            <MenuItem disabled value={0}>
                              Select number of months
                            </MenuItem>
                            {months.map((m, key) => (
                              <MenuItem key={key} value={m}>
                                {m}
                              </MenuItem>
                            ))}
                          </Select>
                          {addressError[adKey]?.residenceMonths ? (
                            <p className="msg">This field is required</p>
                          ) : null}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </FormGroup>
                </Grid>
              </Box>
            ) : null}
          </div>
        ))}
        {searchPostcodeError ? (
          <Box className="error">
            <p className="msg">Please find your address using postcode</p>
          </Box>
        ) : null}
        <Box className="title" sx={{ marginBottom: "-12px" }}>
          Your contact details
        </Box>
        <Grid container columnSpacing={5}>
          <Grid item xs={12} sm={4}>
            <FormGroup>
              <FormControl
                fullWidth
                required
                className={errors.phoneNumber ? "error" : ""}
              >
                <FormLabel className="label">Mobile number</FormLabel>
                <Input
                  value={data.phoneNumber}
                  type="text"
                  disableUnderline
                  placeholder="eg: 077 1781 0761"
                  className="input"
                  onInput={(el) => handleChange("phoneNumber", el)}
                />
                {errors.phoneNumber && (
                  <p className="msg">{errors.phoneNumber}</p>
                )}
              </FormControl>
            </FormGroup>
          </Grid>
        </Grid>
        <Grid container columnSpacing={5}>
          <Grid item xs={12} sm={4}>
            <FormGroup>
              <FormControl
                fullWidth
                required
                className={errors.email ? "error" : ""}
              >
                <FormLabel className="label">Email</FormLabel>
                <Input
                  value={data.email}
                  disableUnderline
                  className="input"
                  onInput={(el) => handleChange("email", el)}
                />
                {errors.email && <p className="msg">{errors.email}</p>}
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormGroup>
              <FormControl
                fullWidth
                required
                className={errors.confirmEmail ? "error" : ""}
              >
                <FormLabel className="label">Confirm email</FormLabel>
                <Input
                  value={data.confirmEmail}
                  disableUnderline
                  className="input"
                  onInput={(el) => handleChange("confirmEmail", el)}
                />
                {errors.confirmEmail && (
                  <p className="msg">{errors.confirmEmail}</p>
                )}
              </FormControl>
            </FormGroup>
          </Grid>
        </Grid>
        <Box className="title" sx={{ marginBottom: "-12px" }}>
          Security information
        </Box>
        <Grid container columnSpacing={5}>
          <Grid item xs={12} sm={5}>
            <FormGroup>
              <FormControl
                fullWidth
                required
                className={errors.securityQuestion1 ? "error" : ""}
              >
                <FormLabel className="label">Security question 1</FormLabel>
                <Select
                  className="input"
                  variant="standard"
                  disableUnderline
                  IconComponent={KeyboardArrowDown}
                  inputProps={{ "aria-label": "Without label" }}
                  value={data.securityQuestion1}
                  onChange={(el) => handleChange("securityQuestion1", el)}
                >
                  <MenuItem disabled value="null">
                    Choose one
                  </MenuItem>
                  {securityQuestionsList.map((ques: any, index) =>
                    ques.usedIn !== 2 ? (
                      <MenuItem
                        onClick={(el) => handleSecurityQuestion(index, 1)}
                        value={ques.key}
                        key={index}
                      >
                        {ques.name}
                      </MenuItem>
                    ) : null,
                  )}
                </Select>
                {errors.securityQuestion1 ? (
                  <p className="msg">This field is required</p>
                ) : null}
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormGroup>
              <FormControl
                fullWidth
                required
                className={errors.securityAnswer1 ? "error" : ""}
              >
                <FormLabel className="label">Security answer 1</FormLabel>
                <Input
                  value={data.securityAnswer1}
                  disableUnderline
                  className="input"
                  onInput={(el) => handleChange("securityAnswer1", el)}
                />
                {errors.securityAnswer1 ? (
                  <p className="msg">This field is required</p>
                ) : null}
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormGroup>
              <FormControl
                fullWidth
                required
                className={errors.securityQuestion2 ? "error" : ""}
              >
                <FormLabel className="label">Security question 2</FormLabel>
                <Select
                  className="input"
                  variant="standard"
                  disableUnderline
                  IconComponent={KeyboardArrowDown}
                  inputProps={{ "aria-label": "Without label" }}
                  value={data.securityQuestion2}
                  onChange={(el) => handleChange("securityQuestion2", el)}
                >
                  <MenuItem disabled value="null">
                    Choose one
                  </MenuItem>
                  {securityQuestionsList.map((ques: any, index) =>
                    ques.usedIn !== 1 ? (
                      <MenuItem
                        onClick={(el) => handleSecurityQuestion(index, 2)}
                        value={ques.key}
                        key={index}
                      >
                        {ques.name}
                      </MenuItem>
                    ) : null,
                  )}
                </Select>
                {errors.securityQuestion2 ? (
                  <p className="msg">This field is required</p>
                ) : null}
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormGroup>
              <FormControl
                fullWidth
                required
                className={errors.securityAnswer2 ? "error" : ""}
              >
                <FormLabel className="label">Security answer 2</FormLabel>
                <Input
                  value={data.securityAnswer2}
                  disableUnderline
                  className="input"
                  onInput={(el) => handleChange("securityAnswer2", el)}
                />
                {errors.securityAnswer2 ? (
                  <p className="msg">This field is required</p>
                ) : null}
              </FormControl>
            </FormGroup>
          </Grid>
        </Grid>
        <Button
          onClick={(e) => handleSubmit(e)}
          sx={{ display: "none" }}
          id="submitButton"
        ></Button>
      </form>
      <CommonNextButton handleSteps={(e: boolean) => handleClick(e)} />
    </Box>
  )
}
