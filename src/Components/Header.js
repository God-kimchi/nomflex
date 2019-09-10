import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
	color: white;
	position: fixed;
	z-index:10;
	top: 0;
	left: 0;
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	padding: 0px 10px;
	background-color: rgba(20, 20, 20, 0.8);
	box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
	display: flex;
`;

const Item = styled.li`
	width: 80px;
	height: 50px;
	text-align: center;
	border-bottom: 3px solid ${(props) => (props.current ? '#3498db' : 'transparent')};
	transition: border-bottom 0.5s ease-in-out;
	/* &:not(:last-child) {
		margin-right: 10px;
	} */
	&:hover{
		border-bottom: 3px solid #eb4d4b;
	}
`;
const SLink = styled(Link)`
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.1s linear;
	&:hover{
		font-size: 14px;
	}
`;

export default withRouter(({ location: { pathname } }) => (
	<Header className={styled.navList}>
		{/* {console.log(props)} */}
		<List>
			<Item current={pathname === '/'}>
				<SLink to="/">Movies</SLink>
			</Item>
			<Item current={pathname === '/tv'}>
				<SLink to="/tv">TV</SLink>
			</Item>
			<Item current={pathname === '/search'}>
				<SLink to="/search">Search</SLink>
			</Item>
		</List>
	</Header>
));
