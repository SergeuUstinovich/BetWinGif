import { useSelector } from 'react-redux'
import { Accordion, Cards } from '../../component'
import StatickGif from '../../component/StatickGif/StatickGif'
import arrAccord from './AccordDataStatic'
import { getGifGenerated } from '../../providers/StoreProvider/selectors/getGifGenerated'
import { TopbarStatic } from '../../component/TopbarStatic/TopbarStatic'

const StaticBanners = () => {
  const statick = useSelector(getGifGenerated)

  return (
    <>
      <TopbarStatic />
      <StatickGif gif={statick} />
      <Accordion arrAccord={arrAccord} />
      <Cards />
    </>
  )
}

export default StaticBanners
