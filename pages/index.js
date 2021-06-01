/**
 * Site-level index page. 
 * 
 * 
 * For now just redirects to the event list page. 
 *
 */

export default function Page() {
    return (<h1>Nothing to see here.</h1>)
}

export function getStaticProps() {
    return {
        redirect: {
            destination: '/event',
            permanent: false,
        }
    }
}