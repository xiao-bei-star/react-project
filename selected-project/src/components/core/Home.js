import Layout from "./Layout"
import Search from "./Search"
import { Typography, Row, Col } from "antd"
import ProductItem from "./ProductItem"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { get_products } from "../../store/actions/products"

const { Title } = Typography

function Home() {
  const dispatch = useDispatch()
  const { sold, createdAt } = useSelector(state => state.products)
  useEffect(() => {
    dispatch(get_products({ sortBy: "sold", limit: 4, order: "desc" }))
    dispatch(get_products({ sortBy: "createdAt", limit: 4, order: "desc" }))
  }, [])
  return (
    <Layout title="拉勾严选首页" subTitle="尽情享受吧">
      <Search />
      <Title style={{ marginTop: 10 }} level={5}>
        最新上架
      </Title>
      <Row gutter={[16, 16]}>
        {createdAt.map(product => (
          <Col key={product._id} span="6">
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
      <Title style={{ marginTop: 10 }} level={5}>
        最受欢迎
      </Title>
      <Row gutter={[16, 16]}>
        {sold.map(product => (
          <Col key={product._id} span="6">
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default Home
