import avatar from './avatarData'
import gear from './gearData'
import questImage from './questImageData'

export const levelData = {
  levels: [
    {
      id: '599eea97-457d-4de8-bced-226ad64066c0',
      quests: [
        {
          id: 'c950b2e3-8b9d-4e6b-9bea-bd677779d7ae',
          name: 'A hero is born!',
          img: questImage.sword,
          skills: ['Created a Scratch account'],
          parents: [],
          descendants: ['0166b45e-9b46-413e-951c-e4a8b0932c59']
        }
      ]
    },
    {
      id: '6f8dbae7-d180-460a-8856-c677a39c744f',
      quests: [
        {
          id: '0166b45e-9b46-413e-951c-e4a8b0932c59',
          name: 'Hello CodeQuest!',
          skills: ['Show/Hide', 'Backdrops'],
          parents: ['c950b2e3-8b9d-4e6b-9bea-bd677779d7ae'],
          descendants: [
            '3acc1285-a613-475c-9626-5880b561efb4',
            '80c8be0e-e682-49f7-ab9a-5b939923c0b2'
          ]
        }
      ]
    },
    {
      id: '51f164b5-f68b-4c06-aa24-8cbd30e1cb77',
      quests: [
        {
          id: '3acc1285-a613-475c-9626-5880b561efb4',
          name: 'Movie Night!',
          img: questImage.movie,
          skills: [
            'Using costume',
            'Using graphic effects',
            'Using "slide to point"',
            'Using the message event',
            'Using "wait"'
          ],
          parents: ['0166b45e-9b46-413e-951c-e4a8b0932c59'],
          descendants: []
          // color goes here
        },
        {
          id: '80c8be0e-e682-49f7-ab9a-5b939923c0b2',
          name: 'Maze Game',
          skills: [
            'Using coordinates',
            'The direction property',
            'Creating animation loops',
            'Using variables',
            'Collisions'
          ],
          parents: ['0166b45e-9b46-413e-951c-e4a8b0932c59'],
          descendants: [
            'e74ded8c-029b-4799-89fe-283e1611e361',
            'bdb072ee-c06d-4810-8038-7b57217530dc'
          ]
          // color goes here
        }
      ]
    },
    {
      quests: [
        {
          name: 'Defender',
          skills: ['Using step movement', 'Using clones', 'Using buffers'],
          parents: ['80c8be0e-e682-49f7-ab9a-5b939923c0b2'],
          descendants: []
        },
        {
          name: 'Text Adventure',
          skills: [
            'Using ask/answer',
            'Using blocks',
            'List variables',
            'Using join',
            'Advanced messages',
            'Advanced backdrops'
          ],
          parents: ['80c8be0e-e682-49f7-ab9a-5b939923c0b2'],
          descendants: []
        }
      ]
    }
  ]
}

export const userData = [
  {
    data: {
      // public data
      name: 'Admin',
      level: 0,
      xp: 0,
      gold: 1000,
      epiphet: 'l33t',
      type: 'elf',
      job: 'hacker',
      hometown: 'fullerton',
      birthday: '1989-08-16T06:00:00.000Z',
      color: 'red',
      food: 'sushi',
      description:
        'An elite elf hacker, Admin surfs the cyberworld looking for new vulnerabilities to exploit'
    },
    admin: {
      // private data
      userName: 'admin',
      password: 'password123',
      email: 'zrexrodriguez@gmail.com',
      userType: 'teacher',
      completedQuests: [
        'c950b2e3-8b9d-4e6b-9bea-bd677779d7ae',
        '6f8dbae7-d180-460a-8856-c677a39c744f',
        '3acc1285-a613-475c-9626-5880b561efb4',
        '80c8be0e-e682-49f7-ab9a-5b939923c0b2'
      ],
      currentQuest: '',
      submittedQuest: ''
    },
    avatar: 2,
    gear: {
      head: '',
      RHand: '',
      legs: '',
      body: '',
      LHand: '',
      feet: ''
    },
    inventory: []
  },
  {
    data: {
      name: 'User',
      level: 2,
      xp: 80,
      gold: 80,
      epiphet: 'fearless',
      type: 'elf',
      job: 'wizard',
      hometown: 'brookyln',
      birthday: '1992-08-10T06:00:00.000Z',
      color: 'blue',
      food: 'fois gras',
      description: 'An elf wizard who excels at cooking'
    },
    admin: {
      userName: 'user',
      password: 'password123',
      email: 'jhunterrodriguez@gmail.com',
      userType: 'student',
      completedQuests: [
        'c950b2e3-8b9d-4e6b-9bea-bd677779d7ae',
        '0166b45e-9b46-413e-951c-e4a8b0932c59',
        '3acc1285-a613-475c-9626-5880b561efb4'
      ],
      currentQuest: '',
      submittedQuest: ''
    },
    avatar: 2,
    gear: {
      head: '',
      RHand: '',
      legs: '',
      body: '',
      LHand: '',
      feet: ''
    },
    inventory: []
  }
]

export const avatarData = {
  head: [
    {
      id: 1,
      name: 'normal',
      src: avatar.head1
    }
  ],
  body: [
    {
      id: 1,
      name: 'normal',
      src: avatar.body1
    }
  ],
  hand: [
    {
      id: 1,
      name: 'normal',
      src: avatar.hand
    }
  ],
  foot: [
    {
      id: 1,
      name: 'normal',
      src: avatar.foot
    }
  ],
  full: [
    {
      id: 1,
      name: 'human',
      src: avatar.human
    },
    {
      id: 2,
      name: 'elf',
      src: avatar.elf
    },
    {
      id: 3,
      name: 'robot',
      src: avatar.robot
    }
  ]
}

export const itemData = [
  {
    id: '60b2888e-1b11-419d-a970-89312ac10e7h',
    name: 'shirt 1',
    location: 'body',
    src: gear.shirt1,
    cost: 10
  },
  {
    id: '60b2888e-1b22-419d-a970-89312dc10e1d',
    name: 'shirt 2',
    location: 'body',
    src: gear.shirt2,
    cost: 10
  },
  {
    id: '60b2888e-1b33-419d-a970-89312ac10e1d',
    name: 'shirt 3',
    location: 'body',
    src: gear.shirt3,
    cost: 10
  },
  {
    id: '3e677c10-a706-46a3-a8b0-bb85ea8779e1',
    name: 'chain mail',
    location: 'body',
    src: gear.body1,
    cost: 10
  },
  {
    id: 'b22b7dd9-e234-4722-86bf-f7508e540072',
    name: 'battle armor',
    location: 'body',
    src: gear.body2,
    cost: 10
  },
  {
    id: 'b1eab51e-1c6c-40fe-9469-9d2258db8251',
    name: 'black robe',
    location: 'body',
    src: gear.robe,
    cost: 10
  },
  {
    id: 'd802239b-99a0-46f2-b2f7-9c1b2bfc90b7',
    name: 'knight armor',
    location: 'body',
    src: gear.body4,
    cost: 10
  },
  {
    id: 'e87f214c-d967-40aa-a5dc-250609127502',
    name: 'bunny slippers',
    location: 'feet',
    src: gear.feet1,
    cost: 10
  },
  {
    id: 'c4bfb726-1f93-4c27-9494-fe7a0b08860b',
    name: 'rocket boots',
    location: 'feet',
    src: gear.feet2,
    cost: 10
  },
  {
    id: '072a5814-eaa8-4a6b-857a-cd75523bd0f8',
    name: 'spikey boots',
    location: 'feet',
    src: gear.feet3,
    cost: 10
  },
  {
    id: '80525212-41e6-4a54-af4f-3cb344da9886',
    name: 'sword',
    location: 'LHand',
    src: gear.lHand1,
    cost: 10
  },
  {
    id: '1eea31e1-7483-4bf8-88d5-35ffb3b442ea',
    name: 'wizard staff',
    location: 'LHand',
    src: gear.lHand2,
    cost: 10
  },
  {
    id: '29d4a077-8a2c-443f-8351-0536766519f3',
    name: 'cyber glove',
    location: 'LHand',
    src: gear.lHand3,
    cost: 10
  },
  {
    id: '1625d36e-af51-45da-8118-d731d1f12355',
    name: 'lazer gun',
    location: 'LHand',
    src: gear.lHand4,
    cost: 10
  },
  {
    id: '9b6825bf-db81-4fc6-b3ea-c1badbf27052',
    name: 'shield',
    location: 'RHand',
    src: gear.rHand1,
    cost: 10
  },
  {
    id: 'd8b0236b-8722-488f-a07f-6d76329c22d2',
    name: 'battle axe',
    location: 'RHand',
    src: gear.rHand2,
    cost: 10
  },
  {
    id: '7c9ce93a-e6e4-4b40-9d48-5d529cd4e580',
    name: 'bow',
    location: 'RHand',
    src: gear.rHand3,
    cost: 10
  },
  {
    id: '3d301693-1f5d-4108-8e0d-2c624901a9f0',
    name: 'double edged sword',
    location: 'RHand',
    src: gear.rHand4,
    cost: 10
  },
  {
    id: 'b263a355-38b2-4bcd-9f14-8a52d8d384c6',
    name: 'knight helmet',
    location: 'head',
    src: gear.head1,
    cost: 10
  },
  {
    id: '03338dad-002f-41f5-9499-e5c5e55de59d',
    name: 'magic hat',
    location: 'head',
    src: gear.head2,
    cost: 10
  },
  {
    id: 'ba4389ca-7773-45fd-9089-e926f16812b7',
    name: 'mohawk',
    location: 'head',
    src: gear.head3,
    cost: 10
  },
  {
    id: 'ed09900f-b8cd-434c-bdc0-14733cd3c1c8',
    name: 'fancy hat',
    location: 'head',
    src: gear.head4,
    cost: 10
  },
  {
    id: '7899d59b-a875-4b64-9834-860643502653',
    name: 'vr goggles',
    location: 'head',
    src: gear.head5,
    cost: 10
  },
  {
    id: '60b1788e-1b77-419d-a970-89312ac10e1d',
    name: 'brown pants',
    location: 'legs',
    src: gear.pants1,
    cost: 10
  },
  {
    id: '71b1788e-1b88-419d-a970-89312ac10e1d',
    name: 'blue pants',
    location: 'legs',
    src: gear.pants2,
    cost: 10
  },
  {
    id: '60b2888e-1b99-419d-a970-89312ac10e1d',
    name: 'white pants',
    location: 'legs',
    src: gear.pants3,
    cost: 10
  },
  {
    id: '1765b578-80c5-4bc1-a978-6537308d4a13',
    name: 'chainmail pants',
    location: 'legs',
    src: gear.legs1,
    cost: 10
  },
  {
    id: 'be312d0e-2b36-415a-b337-19d238fd67fa',
    name: 'space pants',
    location: 'legs',
    src: gear.legs2,
    cost: 10
  },
  {
    id: '74bb4cb3-c093-4b7d-bf6e-c8c4cdc3ff57',
    name: 'leather pants',
    location: 'legs',
    src: gear.legs3,
    cost: 10
  },
  {
    id: '1fe60c22-5d96-4f1a-9624-d9eaa05bc921',
    name: 'striped pants',
    location: 'legs',
    src: gear.legs4,
    cost: 10
  }
]
