import { useSelector } from 'react-redux'
import { Accordion, Cards, Topbar } from '../../component'
import StatickGif from '../../component/StatickGif/StatickGif'
import arrAccord from './AccordDataStatic'
import { getGifGenerated } from '../../providers/StoreProvider/selectors/getGifGenerated'

const StaticBanners = () => {
  const statick = useSelector(getGifGenerated)

  return (
    <>
      <Topbar />
      <StatickGif gif={statick} />
      <Accordion arrAccord={arrAccord} />
      <Cards />
    </>
  )
}

export default StaticBanners
