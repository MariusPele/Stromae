import { PropsWithChildren, useContext, useRef, useState } from 'react';
import SkipLinks from '@codegouvfr/react-dsfr/SkipLinks';
import { useAsyncEffect } from '../../hooks/useAsyncEffect';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';
import { FooterType } from '../footer/FooterType';
import { HeaderType } from '../Header/HeaderType';
import { Header } from '../Header';
import { HeaderAuth } from '../Header/HeaderAuth';
import { Footer } from '../footer/Footer';
import { Layout as LayoutSkeleton } from '../skeleton/Layout';
import { Main } from './Main';

type LayoutProps = {};

const defaultLinks = [
	{
		anchor: '#contenu',
		label: 'Aller au contenu de la page',
	},
];

export function Layout({ children, ...rest }: PropsWithChildren<LayoutProps>) {
	const alreadyLoad = useRef(false);
	const [header, setHeader] = useState<HeaderType | undefined>(undefined);
	const [footer, setFooter] = useState<FooterType | undefined>(undefined);

	const { getMetadata } = useContext(loadSourceDataContext);

	useAsyncEffect(async () => {
		if (!getMetadata || alreadyLoad.current) {
			return;
		}
		alreadyLoad.current = true;
		const data = await getMetadata();
		if (data) {
			const { Header, Footer } = data;
			setHeader(Header);
			setFooter(Footer);
		} else throw new Error('metadata missing.');
	}, [getMetadata, alreadyLoad]);

	if (!header || !footer) {
		return <LayoutSkeleton />;
	}

	return (
		<>
			<SkipLinks links={defaultLinks} />
			<HeaderAuth>
				<Header header={header} />
			</HeaderAuth>
			<Main id="contenu">{children}</Main>
			<Footer footer={footer} />
		</>
	);
}
