//use broadcast
db.createCollection("contact")
db.createCollection("message")
db.contact.insertMany([
  {
    "_id": 1,
    "noWa": 6297961337,
    "Nama": "Cahya Purnama",
    "Umur": 22,
    "Group": "MATERIARN192"
  },
  {
    "_id": 2,
    "noWa": 6294744313,
    "Nama": "Alambana Wibisono",
    "Umur": 35,
    "Group": "MATERIARN192"
  },
  {
    "_id": 3,
    "noWa": 6290410560,
    "Nama": "Darmanto Awan",
    "Umur": 40,
    "Group": "ARN192-MAHAZI"
  },
  {
    "_id": 4,
    "noWa": 6291730076,
    "Nama": "Abdullah Hakim",
    "Umur": 20,
    "Group": "ARN192-MAHAZI"
  },
  {
    "_id": 5,
    "noWa": 6292704277,
    "Nama": "Langgeng Maulana",
    "Umur": 25,
    "Group": "MATERIARN192"
  },
  {
    "_id": 6,
    "noWa": 6299851179,
    "Nama": "Imam",
    "Umur": 22,
    "Group": "MATERIARN192"
  },
  {
    "_id": 7,
    "noWa": 6290688309,
    "Nama": "Ganep Gunawan",
    "Umur": 30,
    "Group": "DISKUSI ARN211-13"
  },
  {
    "_id": 8,
    "noWa": 6290146324,
    "Nama": "Najib Irawan",
    "Umur": 30,
    "Group": "DISKUSI ARN211-13"
  },
  {
    "_id": 9,
    "noWa": 6294756375,
    "Nama": "Irnanto Nugroho",
    "Umur": 50,
    "Group": "DISKUSI ARN211-13"
  },
  {
    "_id": 10,
    "noWa": 6291341825,
    "Nama": "Dodo Rajasa",
    "Umur": 18,
    "Group": "DISKUSI ARN211-13"
  }
]
)

db.message.insertMany(
[
  {
   "_id": 1,
    "subject": "Edu HSI Dibuka",
    "notif": "Email",
    "tanggal": "02-12-2023"
  },
  {
   "_id": 2,
    "subject": "Pendaftaran Sandbox HSI",
    "notif": "Whatsapp",
    "tanggal": "09-12-2023"
  },
  {
   "_id": 3,
    "subject": "Pengumuman Sandbox HSI",
    "notif": "Whatsapp",
    "tanggal": "16-12-2023"
  },
  {
   "_id": 4,
    "subject": "Informasi BMT HSI",
    "notif": "Whatsapp",
    "tanggal": "23-12-2023"
  },
  {
   "_id": 5,
    "subject": "Program Fidyah",
    "notif": "Email",
    "tanggal": "30-12-2023"
  }
])

//1
db.contact.aggregate([
    {
      $group: {
        _id: "$Group",
        jumlah: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        jumlah: 1,
        Group: "$_id"
      }
    }
  ])

//2
db.contact.aggregate([
    {
      $group: {
        _id: {
          ContainsAwan: {
            $cond: {
              if: { $regexMatch: { input: "$Nama", regex: "awan", options: "i" } },
              then: "content awan",
              else: "not content awan"
            }
          }
        },
        jumlah: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: "$_id.ContainsAwan",
        jumlah: "$jumlah"
      }
    }
  ])

//3
db.contact.createIndex({
    Group: 1
})
db.contact.createIndex({
    Nama: "text"
})
//4
db.message.createIndex({
    subject: "text"
})
//5
db.message.createIndex({
    date: 1,
    notif: 1
});
