import styled from 'styled-components';

const VrHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;

  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;

    .operation {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
`;

export default VrHeaderWrapper;
