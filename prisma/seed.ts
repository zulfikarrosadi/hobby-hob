import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const hobbies = await prisma.hobby.createMany({
    data: [
      {
        name: 'Membaca',
        description:
          'Hobi membaca buku bisa memberikan manfaat pada kesehatan fisik, terutama untuk kesehatan otak.',
        image: 'assets/membaca.jpg',
      },
      {
        name: 'Menulis',
        description:
          'Menulis telah menjadi hobi yang bisa dilakukan kapan saja dan tidak membutuhkan banyak peralatan.',
        image: 'assets/menulis.jpg',
      },
      {
        name: 'Memasak',
        description:
          'Selain lebih hemat dan lebih sehat, ternyata hobi masak juga memiliki manfaat bagi kesehatan mental.',
        image: 'assets/memasak.jpg',
      },
      {
        name: 'Menyanyi',
        description:
          'Menyanyi merupakan kebiasaan atau hobi yang bisa dilakukan oleh setiap orang yang mengandalkan kemampuan suara.',
        image: 'assets/menyanyi.jpg',
      },
      {
        name: 'Mengoding',
        description:
          'Jika kita merasa bahagia ketika berhasil memecahkan masalah, bisa jadi coding adalah aktivitas paling sesuai untuk ditekuni.',
        image: 'assets/mengoding.jpg',
      },
      {
        name: 'Menari',
        description:
          'Menari adalah kegiatan yang menyenangkan, selain berfungsi sebagai sarana berekspresi diri, menari juga sama dengan berolahraga.',
        image: 'assets/menari.jpg',
      },
      {
        name: 'Bermain gitar',
        description:
          'Dilansir dari berbagai sumber, bermain gitar bermanfaat dapat meningkatkan kekuatan dan kemampuan otak serta manfaat kesehatan lainnya',
        image: 'assets/gitar.jpg',
      },
      {
        name: 'Bermain basket',
        description:
          'Berkat popularitasnya di seluruh dunia, basket hingga kini menjadi salah satu olahraga terfavorit di Indonesia dan di dunia.',
        image: 'assets/basket.jpg',
      },
      {
        name: 'Bermain futsal',
        description:
          'Dalam permainan futsal kita di tuntut menggerakan semua badan kita dengan maksimal dan juga mengatur strategi agar bisa menang.',
        image: 'assets/futsal.jpg',
      },
      {
        name: 'Fotografi',
        description:
          'Mempunyai hobi fotografi bisa menjadi hal yang menjanjikan, jika sudah mulai menekuninya, hobi ini bisa jadi sumber penghasilan untuk kamu.',
        image: 'assets/fotografi.jpg',
      },
      {
        name: 'Melukis',
        description:
          'Melukis adalah kegiatan yang sangat menyenangkan. Bisa dilakukan di mana saja untuk mengisi kekosongan waktu dan juga juga tidak mahal.',
        image: 'assets/melukis.jpeg',
      },
      {
        name: 'Editing',
        description:
          'Hobi editing adalah hobi jadi pekerjaan selanjutnya. Bagi kamu yang memiliki hobi mengedit foto maupun video, kini saatnya mengembangkan hobimu.',
        image: 'assets/editing.jpg',
      },
    ],
  });

  return hobbies;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
