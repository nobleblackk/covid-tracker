import React from 'react'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import Typography from '@material-ui/core/Typography'
import { AlertTitle } from '@material-ui/lab'
import { Alert } from '@material-ui/lab'
const AlertComponent = (props) => {
	const { type = 'error', message = '' } = props
	return (
		<div
			style={{
				zIndex: 250000,
				width: 'auto',
				position: 'absolute',
				top: '4.375rem',
				right: '2.5rem',
			}}
		>
			<Alert
				iconMapping={
					type === 'error'
						? { error: <ErrorOutlineIcon fontSize='inherit' /> }
						: { success: <CheckCircleOutlineIcon fontSize='inherit' /> }
				}
				severity={type === 'error' ? 'error' : 'success'}
			>
				<AlertTitle>{type === 'error' ? 'Error' : 'Success'}</AlertTitle>
				<Typography
					variant='body1'
					color={type === 'error' ? 'error' : 'success'}
				>
					{message}
				</Typography>
			</Alert>
		</div>
	)
}

export default AlertComponent
