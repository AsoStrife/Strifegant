import { createI18n } from 'vue-i18n'
import it from '@/assets/i18n/it'

const i18n = {
    it
}

export default createI18n({
    locale: 'it',
    fallbackLocale: 'it',
    messages: i18n,
})