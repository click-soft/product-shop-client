import CircleLoading from '../../components/Loading/CircleLoading';
import useMainQuery from '../../hooks/main/useMainQuery';
import ProductGroups from '../../components/Main/ProductGroups/ProductGroups';

function MainPage() {
  const { prodGroups, loading } = useMainQuery();

  return (
    <>
      {loading && <CircleLoading />}
      <ProductGroups prodGroups={prodGroups} />
    </>
  );
}

export default MainPage;
