import CircleLoading from '../../components/Loading/CircleLoading';
import useMainQuery from '../../hooks/main/use-main-query';
import ProductGroups from '../../components/Main/ProductGroups/ProductGroups';
import useClearModal from '../../hooks/use-clear-modal';

function MainPage() {
  const { prodGroups, loading } = useMainQuery();
  useClearModal();

  return (
    <>
      {loading && <CircleLoading />}
      <ProductGroups prodGroups={prodGroups} />
    </>
  );
}

export default MainPage;
