
const provinces = [
    {
        id: "0",
        label: "Select Your Province",
    },
    {
        id: "1",
        label: "Province No. 1",
        value: 'Province1',
    },
    {
        id: "2",
        label: "Province No. 2",
        value: 'Province2',
    },
    {
        id: "3",
        label: "Province No. 3 / Bagmati Province",
        value: 'Province3'
    },
    {
        id: "4",
        label: "Province No. 4 / Gandaki Province",
        value: 'Province4'
    },
    {
        id: "5",
        label: "Province No. 5 / Lumbini Province",
        value: 'Province5'
    },
    {
        id: "6",
        label: "Province No. 6 / Karnali Province",
        value: 'Province6'
    },
    {
        id: "7",
        label: "Province No. 7 / Sudurpashchim Province",
        value: 'Province7'
    },
]

const districts = [
    {
        id: 0,
        label: "Select Your District",
        province_id: "0"
    },
    {
        id: 1,
        value: "Bhojpur",
        label: "Bhojpur",
        province_id: "1"
    },
    {
        id: 2,
        value: "Dhankuta",
        label: "Dhankuta",
        province_id: "1"
    },
    {
        id: 3,
        value: "Ilam",
        label: "Ilam",
        province_id: "1"
    },
    {
        id: 4,
        value: "Jhapa",
        label: "Jhapa",
        province_id: "1"
    },
    {
        id: 5,
        value: "Khotang",
        label: "Khotang",
        province_id: "1"
    },
    {
        id: 6,
        value: "Morang",
        label: "Morang",
        province_id: "1"
    },
    {
        id: 7,
        value: "Okhaldhunga",
        label: "Okhaldhunga",
        province_id: "1"
    },
    {
        id: 8,
        value: "Panchthar",
        label: "Panchthar",
        province_id: "1"
    },
    {
        id: 9,
        value: "Sankhuwasabha",
        label: "Sankhuwasabha",
        province_id: "1"
    },
    {
        id: 10,
        value: "Solukhumbu",
        label: "Solukhumbu",
        province_id: "1"
    },
    {
        id: 11,
        value: "Sunsari",
        label: "Sunsari",
        province_id: "1"
    },
    {
        id: 12,
        value: "Taplejung",
        label: "Taplejung",
        province_id: "1"
    },
    {
        id: 13,
        value: "Terhathum",
        label: "Terhathum",
        province_id: "1"
    },
    {
        id: 14,
        value: "Udayapur",
        label: "Udayapur",
        province_id: "1"
    },
    {
        id: 15,
        value: "Bara",
        label: "Bara",
        province_id: "2"
    },
    {
        id: 16,
        value: "Dhanusha",
        label: "Dhanusha",
        province_id: "2"
    },
    {
        id: 17,
        value: "Mahottari",
        label: "Mahottari",
        province_id: "2"
    },
    {
        id: 18,
        value: "Parsa",
        label: "Parsa",
        province_id: "2"
    },
    {
        id: 19,
        value: "Rautahat",
        label: "Rautahat",
        province_id: "2"
    },
    {
        id: 20,
        value: "Saptari",
        label: "Saptari",
        province_id: "2"
    },
    {
        id: 21,
        value: "Sarlahi",
        label: "Sarlahi",
        province_id: "2"
    },
    {
        id: 22,
        value: "Siraha",
        label: "Siraha",
        province_id: "2"
    },
    {
        id: 23,
        value: "Bhaktapur",
        label: "Bhaktapur",
        province_id: "3"
    },
    {
        id: 24,
        value: "Chitwan",
        label: "Chitwan",
        province_id: "3"
    },
    {
        id: 25,
        value: "Dhading",
        label: "Dhading",
        province_id: "3"
    },
    {
        id: 26,
        value: "Dolakha",
        label: "Dolakha",
        province_id: "3"
    },
    {
        id: 27,
        value: "Kathmandu",
        label: "Kathmandu",
        province_id: "3"
    },
    {
        id: 28,
        value: "Kavrepalanchok",
        label: "Kavrepalanchok",
        province_id: "3"
    },
    {
        id: 29,
        value: "Lalitpur",
        label: "Lalitpur",
        province_id: "3"
    },
    {
        id: 30,
        value: "Makwanpur",
        label: "Makwanpur",
        province_id: "3"
    },
    {
        id: 31,
        value: "Nuwakot",
        label: "Nuwakot",
        province_id: "3"
    },
    {
        id: 32,
        value: "Ramechhap",
        label: "Ramechhap",
        province_id: "3"
    },
    {
        id: 33,
        value: "Rasuwa",
        label: "Rasuwa",
        province_id: "3"
    },
    {
        id: 34,
        value: "Sindhuli",
        label: "Sindhuli",
        province_id: "3"
    },
    {
        id: 35,
        value: "Sindhupalchok",
        label: "Sindhupalchok",
        province_id: "3"
    },
    {
        id: 36,
        value: "Baglung",
        label: "Baglung",
        province_id: "4"
    },
    {
        id: 37,
        value: "Gorkha",
        label: "Gorkha",
        province_id: "4"
    },
    {
        id: 38,
        value: "Kaski",
        label: "Kaski",
        province_id: "4"
    },
    {
        id: 39,
        value: "Lamjung",
        label: "Lamjung",
        province_id: "4"
    },
    {
        id: 40,
        value: "Manang",
        label: "Manang",
        province_id: "4"
    },
    {
        id: 41,
        value: "Mustang",
        label: "Mustang",
        province_id: "4"
    },
    {
        id: 42,
        value: "Myagdi",
        label: "Myagdi",
        province_id: "4"
    },
    {
        id: 43,
        value: "Nawalpur",
        label: "Nawalpur",
        province_id: "4"
    },
    {
        id: 44,
        value: "Parbat",
        label: "Parbat",
        province_id: "4"
    },
    {
        id: 45,
        value: "Syangja",
        label: "Syangja",
        province_id: "4"
    },
    {
        id: 46,
        value: "Tanahun",
        label: "Tanahun",
        province_id: "4"
    },
    {
        id: 47,
        value: "Arghakhanchi",
        label: "Arghakhanchi",
        province_id: "5"
    },
    {
        id: 48,
        value: "Banke",
        label: "Banke",
        province_id: "5"
    },
    {
        id: 49,
        value: "Bardiya",
        label: "Bardiya",
        province_id: "5"
    },
    {
        id: 50,
        value: "Dang Deukhuri",
        label: "Dang Deukhuri",
        province_id: "5"
    },
    {
        id: 51,
        value: "Eastern Rukum",
        label: "Eastern Rukum",
        province_id: "5"
    },
    {
        id: 52,
        value: "Gulmi",
        label: "Gulmi",
        province_id: "5"
    },
    {
        id: 53,
        value: "Kapilvastu",
        label: "Kapilvastu",
        province_id: "5"
    },
    {
        id: 54,
        value: "Parasi",
        label: "Parasi",
        province_id: "5"
    },
    {
        id: 55,
        value: "Palpa",
        label: "Palpa",
        province_id: "5"
    },
    {
        id: 56,
        value: "Pyuthan",
        label: "Pyuthan",
        province_id: "5"
    },
    {
        id: 57,
        value: "Rolpa",
        label: "Rolpa",
        province_id: "5"
    },
    {
        id: 58,
        value: "Rupandehi",
        label: "Rupandehi",
        province_id: "5"
    },
    {
        id: 59,
        value: "Dailekh",
        label: "Dailekh",
        province_id: "6"
    },
    {
        id: 60,
        value: "Dolpa",
        label: "Dolpa",
        province_id: "6"
    },
    {
        id: 61,
        value: "Humla",
        label: "Humla",
        province_id: "6"
    },
    {
        id: 62,
        value: "Jajarkot",
        label: "Jajarkot",
        province_id: "6"
    },
    {
        id: 63,
        value: "Jumla",
        label: "Jumla",
        province_id: "6"
    },
    {
        id: 64,
        value: "Kalikot",
        label: "Kalikot",
        province_id: "6"
    },
    {
        id: 65,
        value: "Mugu",
        label: "Mugu",
        province_id: "6"
    },
    {
        id: 66,
        value: "Salyan",
        label: "Salyan",
        province_id: "6"
    },
    {
        id: 67,
        value: "Surkhet",
        label: "Surkhet",
        province_id: "6"
    },
    {
        id: 68,
        value: "Western Rukum",
        label: "Western Rukum",
        province_id: "6"
    },
    {
        id: 69,
        value: "Achham",
        label: "Achham",
        province_id: "7"
    },
    {
        id: 70,
        value: "Baitadi",
        label: "Baitadi",
        province_id: "7"
    },
    {
        id: 71,
        value: "Bajhang",
        label: "Bajhang",
        province_id: "7"
    },
    {
        id: 72,
        value: "Bajura",
        label: "Bajura",
        province_id: "7"
    },
    {
        id: 73,
        value: "Dadeldhura",
        label: "Dadeldhura",
        province_id: "7"
    },
    {
        id: 74,
        value: "Darchula",
        label: "Darchula",
        province_id: "7"
    },
    {
        id: 75,
        value: "Doti",
        label: "Doti",
        province_id: "7"
    },
    {
        id: 76,
        value: "Kailali",
        label: "Kailali",
        province_id: "7"
    },
    {
        id: 77,
        value: "Kanchanpur",
        label: "Kanchanpur",
        province_id: "7"
    }
]

export { provinces, districts }
