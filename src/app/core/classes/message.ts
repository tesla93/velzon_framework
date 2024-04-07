import Swal from "sweetalert2";


export class Message {

    static Success(detail: string, summary?: string) {
        Swal.fire({
            title: summary,
            text: detail,
            icon: 'success',
            timer: 4000,
            timerProgressBar: true,
        })
    }

    static Error(detail: string, summary?: string) {
        Swal.fire({
            title: summary,
            text: detail,
            icon: 'error',
            timer: 4000,
            timerProgressBar: true,
        })
    }

    static Info(detail: string, summary?: string) {
        Swal.fire({
            title: summary,
            text: detail,
            icon: 'info',
            timer: 4000,
            timerProgressBar: true,
        })
    }

    static Warning(detail: string, summary?: string) {
        Swal.fire({
            title: summary,
            text: detail,
            icon: 'warning',
            timer: 4000,
            timerProgressBar: true,
        })
    }
}