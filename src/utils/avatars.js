// Animal-themed avatar configuration với DiceBear 9.x
export const AVATARS = [
    { id: 1, src: 'https://api.dicebear.com/9.x/bottts/svg?seed=cat', name: 'Cat' },
    { id: 2, src: 'https://api.dicebear.com/9.x/bottts/svg?seed=dog', name: 'Dog' },
    { id: 3, src: 'https://api.dicebear.com/9.x/bottts/svg?seed=panda', name: 'Panda' },
    { id: 4, src: 'https://api.dicebear.com/9.x/bottts/svg?seed=fox', name: 'Fox' },
    { id: 5, src: 'https://api.dicebear.com/9.x/bottts/svg?seed=bear', name: 'Bear' },
    { id: 6, src: 'https://api.dicebear.com/9.x/bottts/svg?seed=rabbit', name: 'Rabbit' },
    { id: 7, src: 'https://api.dicebear.com/9.x/bottts/svg?seed=lion', name: 'Lion' },
    { id: 8, src: 'https://api.dicebear.com/9.x/bottts/svg?seed=elephant', name: 'Elephant' },
    { id: 9, src: 'https://api.dicebear.com/9.x/bottts/svg?seed=penguin', name: 'Penguin' },
    { id: 10, src: 'https://api.dicebear.com/9.x/bottts/svg?seed=owl', name: 'Owl' }
];

// Get avatar by ID
export const getAvatarById = (id) => {
    return AVATARS.find(avatar => avatar.id === id) || AVATARS[0];
};

// Default avatar ID
export const DEFAULT_AVATAR_ID = 1;