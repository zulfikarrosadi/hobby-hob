import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.hobby.createMany({
    data: [
      {
        name: 'Membaca',
        description:
          'Hobi membaca buku bisa memberikan manfaat pada kesehatan fisik, terutama untuk kesehatan otak.',
      },
      {
        name: 'Menulis',
        description:
          'Menulis telah menjadi hobi yang bisa dilakukan kapan saja dan tidak membutuhkan banyak peralatan.',
      },
      {
        name: 'Memasak',
        description:
          'Selain lebih hemat dan lebih sehat, ternyata hobi masak juga memiliki manfaat bagi kesehatan mental.',
      },
      {
        name: 'Menyanyi',
        description:
          'Menyanyi merupakan kebiasaan atau hobi yang bisa dilakukan oleh setiap orang yang mengandalkan kemampuan suara.',
      },
      {
        name: 'Mengoding',
        description:
          'Jika kita merasa bahagia ketika berhasil memecahkan masalah, bisa jadi coding adalah aktivitas paling sesuai untuk ditekuni.',
      },
      {
        name: 'Menari',
        description:
          'Menari adalah kegiatan yang menyenangkan, selain berfungsi sebagai sarana berekspresi diri, menari juga sama dengan berolahraga.',
      },
      {
        name: 'Bermain gitar',
        description:
          'Dilansir dari berbagai sumber, bermain gitar bermanfaat dapat meningkatkan kekuatan dan kemampuan otak serta manfaat kesehatan lainnya',
      },
      {
        name: 'Bermain basket',
        description:
          'Berkat popularitasnya di seluruh dunia, basket hingga kini menjadi salah satu olahraga terfavorit di Indonesia dan di dunia.',
      },
      {
        name: 'Bermain futsal',
        description:
          'Dalam permainan futsal kita di tuntut menggerakan semua badan kita dengan maksimal dan juga mengatur strategi agar bisa menang.',
      },
      {
        name: 'Fotografi',
        description:
          'Mempunyai hobi fotografi bisa menjadi hal yang menjanjikan, jika sudah mulai menekuninya, hobi ini bisa jadi sumber penghasilan untuk kamu.',
      },
      {
        name: 'Melukis',
        description:
          'Melukis adalah kegiatan yang sangat menyenangkan. Bisa dilakukan di mana saja untuk mengisi kekosongan waktu dan juga juga tidak mahal.',
      },
      {
        name: 'Editing',
        description:
          'Hobi editing adalah hobi jadi pekerjaan selanjutnya. Bagi kamu yang memiliki hobi mengedit foto maupun video, kini saatnya mengembangkan hobimu.',
      },
    ],
  });

  return result;
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
