import * as React from 'react';
import { PageNode } from '../../models/Page';
import SocialUtils from '../../utils/SocialUtils';

type Props = {
    post: PageNode;
};

export default function PostGitHubSection(props: Props) {
    return (
        <div className="page">
            <h2>Contribuisci</h2>
            <p><b>Attenzione</b>: questo articolo è stato <u>scritto da un umano</u> e può contenere degli errori. Ne hai trovato uno o vuoi aggiungere qualche altra nozione o dettaglio?</p>
            <p>Sentiti libero di <a href={SocialUtils.getGithubEditLink(props.post)}>modificarlo su GitHub</a> ✏️</p>
        </div>
    );
}