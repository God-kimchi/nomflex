import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "../../Components/Message";

const Container = styled.div`
  /* 100%의 viewport height를 쓸껀데, 이건 screen의 height를 의미하는 거야. */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 20px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`
  font-size: 16px;
`;
const Item2 = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  &:hover {
    font-weight: bold;
  }
`;

const ItemIMDB = styled.button`
  width: 55px;
  height: 18px;
  font-size: 12px;
  font-weight: 600;
  border: 0px solid black;
  border-radius: 5px;
  cursor: pointer;
  background-color: #e8b708;
`;
const A = styled.a`
  margin-bottom: 30px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 14px;
  opacity: 0.7;
  line-height: 1.5;
  width: 60%;
`;

const ItemContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;
const Title2 = styled.h2`
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 20px;
`;
const ItemBox = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  padding-left: 15px;
  font-size: 14px;
  overflow: hidden;
`;
const ItemBox2 = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`;
const CompaniesImg = styled.img`
  width: auto;
  height: 60px;
  margin-right: 30px;
`;
const SeasonImg = styled.img`
  width: auto;
  height: 150px;
  margin-right: 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader></Loader>
    </>
  ) : error ? (
    <Message></Message>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        ></Cover>
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time} min
            </Item>
            <Divider>•</Divider>
            {result.genres &&
              result.genres.map((genre, index) =>
                index === result.genres.length - 1
                  ? genre.name
                  : `${genre.name}   / `,
              )}
            <Divider>•</Divider>
            {result.imdb_id && <A href={`https://www.imdb.com/title/${result.imdb_id}`}>
              <ItemIMDB>IMDB</ItemIMDB>
            </A>}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {result.production_companies && (
            <ItemContainer2>
              <Title2>Production Companies</Title2>
              <ItemBox>
                {result.production_companies &&
                  result.production_companies.map(
                    (item, index) =>
                      item.logo_path && (
                        <CompaniesImg
                          src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                          key={index}
                        ></CompaniesImg>
                      ),
                  )}
              </ItemBox>
            </ItemContainer2>
          )}
          {result.production_countries && (
            <ItemContainer2>
              <Title2>Production Countries</Title2>
              <ItemBox>
                {result.production_countries &&
                  result.production_countries.map((item, index) =>
                    index === result.production_countries.length - 1
                      ? item.name
                      : `${item.name}   / `,
                  )}
              </ItemBox>
            </ItemContainer2>
          )}
          {result.seasons && (
            <ItemContainer2>
              <Title2>Seasons</Title2>
              <ItemBox>
                {result.seasons &&
                  result.seasons.map(
                    (item, index) =>
                      item.poster_path && (
                        <SeasonImg
                          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                          key={index}
                        ></SeasonImg>
                      ),
                  )}
              </ItemBox>
            </ItemContainer2>
          )}
          {result.videos && (
            <ItemContainer2>
              <Title2>Videos</Title2>
              <ItemBox2>
                {result.videos.results &&
                  result.videos.results.map(
                    (item, index) =>
                      item.key && (
                        <A
                          href={`https://www.youtube.com/watch?v=${item.key}`}
                          key={index}
                        >
                          <Item2>{item.name}</Item2>
                          <iframe
                            id="ytplayer"
                            type="text/html"
                            width="500"
                            height="282"
                            src={`https://www.youtube.com/embed/${item.key}`}
                            frameborder="0"
                            allowfullscreen
                            title={item.name}
                            style={{borderRadius:"15px", backgroundColor:"rgba(20,20,20,1)"}}
                          ></iframe>
                        </A>
                      ),
                  )}
              </ItemBox2>
            </ItemContainer2>
          )}
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
