import styled from '@emotion/styled';
import Button from '@/components/Common/Button/Button';

interface CartInfoViewProps {
  totalPrice: number;
  onPayment: () => void;
}

const deliveryPrice = 3000;
const discountPrice = 0;

const CartInfoView = ({ totalPrice, onPayment }: CartInfoViewProps) => {
  const paymentPrice = totalPrice + deliveryPrice - discountPrice;

  return (
    <div className="px-4">
      <div className="flex flex-col p-4 space-y-4 min-w-[300px] border border-gray-200">
        <div>Info</div>
        <Row>
          <span>금액</span>
          <span>{totalPrice.toLocaleString('ko-kr')} 원</span>
        </Row>
        <Row>
          <span>배송비</span>
          <span>{deliveryPrice.toLocaleString('ko-kr')} 원</span>
        </Row>
        <Row>
          <span>할인 금액</span>
          <span>{discountPrice.toLocaleString('ko-kr')} 원</span>
        </Row>
        <Row>
          <span className="font-semibold">결제 금액</span>
          <span className="font-bold">
            {paymentPrice.toLocaleString('ko-kr')} 원
          </span>
        </Row>

        <Button onClick={onPayment}>구매하기</Button>
      </div>
    </div>
  );
};

export default CartInfoView;

const Row = styled.div`
  display: flex;

  * ~ * {
    margin-left: auto;
  }
`;
