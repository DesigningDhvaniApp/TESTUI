import { useToast, UseToastOptions } from '@chakra-ui/react'

class ToastManager {
  private toast: ReturnType<typeof useToast> | null = null

  public setToast(toastInstance: ReturnType<typeof useToast>) {
    this.toast = toastInstance
  }

  public showToast(options: UseToastOptions) {
    if (this.toast) {
      this.toast(options)
    } else {
      console.error('Toast instance is not initialized.')
    }
  }

  public success(message: string) {
    this.showToast({
      title: message,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom-right',
    })
  }

  public info(message: string) {
    this.showToast({
      title: message,
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: 'bottom-right',
    })
  }

  public warning(message: string) {
    this.showToast({
      title: message,
      status: 'warning',
      duration: 5000,
      isClosable: true,
      position: 'bottom-right',
    })
  }

  public error(message: string) {
    this.showToast({
      title: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'bottom-right',
    })
  }
}

const toastManager = new ToastManager()
export default toastManager
