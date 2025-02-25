interface SelectItem {
  value: string;
  content: string;
  id: string
}

export interface SelectItems {
  [key: string]: SelectItem[]
}

export const listBoxItems: SelectItems = {
    country: [
        { value: 'Kenya', content: 'Kenya', id: '1' },
        { value: 'Nigeria', content: 'Nigeria', id: '2' },
        { value: 'Ghana', content: 'Ghana', id: '3' },
        { value: 'Zambia', content: 'Zambia', id: '4' },
        { value: 'Uganda', content: 'Uganda', id: '5' },
        { value: 'DR Congo', content: 'DR Congo', id: '6' },
        { value: 'Cameroon Gabon', content: 'Cameroon Gabon', id: '7' },
        { value: 'Benin', content: 'Benin', id: '8' },
        { value: 'Burkina Faso', content: 'Burkina Faso', id: '9' },
        { value: 'Ivory Coast', content: 'Ivory Coast', id: '10' },
        { value: 'Senegal', content: 'Senegal', id: '11' },
        { value: 'Mali', content: 'Mali', id: '12'},
        { value: 'Angola', content: 'Angola', id: '13' },
        { value: 'Morocco', content: 'Morocco', id: '14' },
        { value: 'Mozambique', content: 'Mozambique', id: '15' },
        { value: 'Tanzania', content: 'Tanzania', id: '16' },
        { value: 'Brazil', content: 'Brazil', id: '17' },
        { value: 'India', content: 'India', id: '18' },
        { value: 'Peru', content: 'Peru', id: '19' },
        { value: 'Argentina', content: 'Argentina', id: '20' },
        { value: 'Mexico', content: 'Mexico', id: '21' },
        { value: 'Colombia', content: 'Colombia', id: '22' },
        { value: 'Chile', content: 'Chile', id: '23' },
        { value: 'Malaysia', content: 'Malaysia', id: '24' },
        { value: 'Indonesia', content: 'Indonesia', id: '25' },
        { value: 'Thailand', content: 'Thailand', id: '26' },
        { value: 'Uzbekistan', content: 'Uzbekistan', id: '27' },
        { value: 'Philippines', content: 'Philippines', id: '28' },
        { value: 'Bangladesh', content: 'Bangladesh', id: '29' },
    ],
    language: [
      { value: "English", content: "English", id: "1" },
      { value: "Русский", content: "Русский", id: "2" },
      { value: "Française", content: "Française", id: "3" },
      { value: "Español", content: "Español", id: "4" },
      { value: "Português", content: "Português", id: "5" },
    ],
    currency: [
        { value: 'KES', content: 'KES', id: '1' },
        { value: 'NGN', content: 'NGN', id: '2' },
        { value: 'GHS', content: 'GHS', id: '3' },
        { value: 'ZMW', content: 'ZMW', id: '4' },
        { value: 'UGX', content: 'UGX', id: '5' },
        { value: 'CDF', content: 'CDF', id: '6' },
        { value: 'XAF', content: 'XAF', id: '7' },
        { value: 'XOF', content: 'XOF', id: '8' },
        { value: 'AOA', content: 'AOA', id: '9' },
        { value: 'MAD', content: 'MAD', id: '10' },
        { value: 'MZN', content: 'MZN', id: '11' },
        { value: 'TZS', content: 'TZS', id: '12' },
        { value: 'BRL', content: 'BRL', id: '13' },
        { value: 'INR', content: 'INR', id: '14' },
        { value: 'PEN', content: 'PEN', id: '15' },
        { value: 'ARS', content: 'ARS', id: '16' },
        { value: 'MXN', content: 'MXN', id: '17' },
        { value: 'COP', content: 'COP', id: '18' },
        { value: 'CLP', content: 'CLP', id: '19' },
        { value: 'MYR', content: 'MYR', id: '20' },
        { value: 'IDR', content: 'IDR', id: '21' },
        { value: 'THB', content: 'THB', id: '22' },
        { value: 'UZS', content: 'UZS', id: '23' },
        { value: 'PHP', content: 'PHP', id: '24' },
        { value: 'BDT', content: 'BDT', id: '25' },
    ],
    banner_format: [
      { value: "300x300", content: "300x300", id: "1" },
      { value: "600x600", content: "600x600", id: "2" },
      { value: "900x900", content: "900x900", id: "3" },
    ],
    banner_theme: [
      { value: "Footbal", content: "Footbal", id: "1" },
    ],
  };