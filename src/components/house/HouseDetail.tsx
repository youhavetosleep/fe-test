import House from "@model/House";
import Link from "next/link";
import styled from "styled-components";

const HouseDetail = ({ item }: { item: House }) => {
    return (
        <Card>
            <Container>
                <Img
                    src={item?.images[0].url}
                    onError={(event: any) => {
                        event.target.src =
                            "https://e2states.com/wp-content/plugins/nimble-builder/assets/img/default-img.png";
                        event.onerror = null;
                    }}
                />
                <Content>
                    <Title>{item?.name}</Title>

                    <ContentWrap>
                        <SubTitle>타입</SubTitle>
                        <Text>{item?.houseType}</Text>
                    </ContentWrap>

                    <ContentWrap>
                        <SubTitle>학교</SubTitle>
                        <Text>{item?.university}</Text>
                    </ContentWrap>

                    <ContentWrap>
                        <SubTitle>주소</SubTitle>
                        <Text>{item?.address}</Text>
                    </ContentWrap>

                    <ContentWrap>
                        <SubTitle>설명</SubTitle>
                        <Text>{item?.description}</Text>
                    </ContentWrap>
                </Content>
            </Container>
        </Card>
    );
};

export default HouseDetail;

const Card = styled.div`
    width: 100%;
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 30px;
    a {
        text-decoration: none;
        color: #111;
    }
`;

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

const Img = styled.img`
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const Content = styled.div`
    padding: 3px;
    box-sizing: border-box;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
`;

const Title = styled.h3`
    margin: 0;
`;

const SubTitle = styled.h5`
    margin: 0 0 10px 0;
`;

const ContentWrap = styled.div`
    align-items: start;
    margin-bottom: 20px;
`;

const Text = styled.p`
    margin: 0;
    font-size: 15px;
    line-height: 20px;
`;