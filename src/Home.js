import './App.css'
import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import { Button } from '@material-ui/core'
import AlertComponent from './AlertComponent'

const Home = () => {
	const adminURL = 'http://15.206.68.215:9091'
	const [values, setValues] = useState({
		pinCode: '',
		email: '',
		age: '',
		date: '',
	})

	const [code, setCode] = useState(1)

	const [pinCode, setPincode] = useState('')
	const [email, setEmail] = useState('')
	const [age, setAge] = useState('')
	const [date, setDate] = useState(null)

	const handlePincode = (e) => {
		setPincode(e.target.value)
	}
	const handleEmail = (e) => {
		setEmail(e.target.value)
	}
	const handleDate = (e) => {
		setDate(moment(e).format('YYYY-MM-DD'))
	}
	const handleAge = (e) => {
		setAge(e.target.value)
	}

	const fetchData = async (data) => {
		await fetch(`${adminURL}/api/v1/vaccine/slot/find`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status === 1) {
					console.log('res', res)
					setPincode('')
					setEmail('')
					setAge('')
					setDate(null)

					setCode(200)
				} else {
					setPincode('')
					setEmail('')
					setAge('')
					setDate(null)
					setCode(500)
				}
			})
			.catch((e) => console.log('error while Submission', e))
	}

	const handleSubmit = () => {
		if (pinCode.length !== 6) {
			setCode(500)
		} else if (email === '') {
			setCode(500)
		} else if (age === '') {
			setCode(500)
		} else if (date === null) {
			setCode(500)
		} else {
			//  setCode(200)
			let data = {
				pinCode,
				email,
				age,
				date,
			}
			fetchData(data)
		}
	}

	setTimeout(() => {
		setCode(1)
	}, [4000])

	return (
		<>
			{code &&
				code !== 1 &&
				(code === 200 ? (
					<AlertComponent
						type={'success'}
						message={"You'll be notified soon !!!"}
					/>
				) : (
					<AlertComponent
						type={'error'}
						message={'You must fill in the Pincode, Email, Age, Name !!!'}
					/>
				))}
			<div className='header'>Covid Vaccine Slot Finder</div>
			<div className='wrapper'>
				<div style={{ marginBottom: '20px', width: '60%' }}>
					<TextField
						fullWidth={true}
						required={true}
						color='primary'
						variant='outlined'
						label='Enter Pincode'
						value={pinCode}
						onChange={handlePincode}
					/>
				</div>
				<div style={{ marginBottom: '20px', width: '60%' }}>
					<TextField
						fullWidth={true}
						required={true}
						color='primary'
						variant='outlined'
						label='Enter Age'
						value={age}
						onChange={handleAge}
					/>
				</div>
				<div style={{ marginBottom: '20px', width: '60%' }}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							fullWidth={true}
							required={true}
							disablePast={true}
							inputVariant='outlined'
							animateYearScrolling={true}
							views={['year', 'month', 'date']}
							openTo={'date'}
							variant='dialog'
							margin='normal'
							id='publish date'
							label='Publish date'
							format='MM/dd/yyyy'
							value={date}
							onChange={(e) => {
								handleDate(e)
							}}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
							style={{ marginRight: '20px' }}
						/>
					</MuiPickersUtilsProvider>
				</div>
				<div style={{ marginBottom: '20px', width: '60%' }}>
					<TextField
						fullWidth={true}
						required={true}
						color='primary'
						variant='outlined'
						label='Enter Email'
						value={email}
						onChange={handleEmail}
					/>
				</div>
				<div className='submit-button'>
					<Button
						onClick={handleSubmit}
						color='primary'
						variant='contained'
						sx={{ color: '#335AFF' }}
					>
						Submit
					</Button>
				</div>
			</div>
		</>
	)
}

export default Home
