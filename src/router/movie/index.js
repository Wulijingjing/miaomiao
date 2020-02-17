export default {
    path: '/movie',
    component: () => import('@/views/Movie'),
    children: [
        {
            path: 'nowPlaying',
            component: () => import('@/components/NowPlaying')
        },
        {
            path: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'comingSoon',
            component: () => import('@/components/ComingSoon')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
        },
        {
            path:'detail/1/:movieId',
            components: {
                default: ()=>import("@/components/NowPlaying"),
                detail: ()=> import('@/views/Movie/detail')
            },
            props: {
                detail: true //这个要和上面的detail相同，若只有一个component，则写成
                //props： true
            }
        },
        {
            path:'detail/2/:movieId',
            components: {
                default: ()=>import("@/components/ComingSoon"),
                detail: ()=> import('@/views/Movie/detail')
            },
            props: {
                detail: true //这个要和上面的detail相同，若只有一个component，则写成
                //props： true
            }
        },
        {
            path: '*',
            redirect: 'nowPlaying'
        }

    ]
}
