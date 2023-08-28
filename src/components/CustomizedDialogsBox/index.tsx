import * as React from "react"
import { styled } from "@mui/material/styles"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}
export interface CustomizedDialogsBoxProps {
  title: string
  subTitle?: string
  children?: React.ReactNode
  open: boolean
  handleClose: () => void
  handleSubmit?: () => void
}
export default function CustomizedDialogsBox({
  title,
  subTitle,
  children,
  open,
  handleSubmit,
  handleClose,
}: CustomizedDialogsBoxProps) {
  const [contentScrolled, setContentScrolled] = useState(false)

  const handleScroll = (el: React.BaseSyntheticEvent) => {
    if (
      el.target.scrollTop >
      el.target.scrollHeight - el.target.offsetHeight - 10
    )
      setContentScrolled(true)
  }
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {subTitle && <Typography gutterBottom>{subTitle}</Typography>}
          <Box id="scrollable-content" onScroll={handleScroll}>
            {children}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button disabled={!contentScrolled} onClick={handleSubmit}>
            Accept & Continue
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
