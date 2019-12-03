import urljoin from 'url-join';
import { PageNode } from '../models/Page';
import Config from '../config/Config';

export default class SocialUtils {

  static getLinkedInShareLink(p: PageNode): string {
    let parameters = `?mini=true&url=${Config.SiteUrl + p.fields.slug}&title=${p.frontmatter.title}`;
    if (p.frontmatter.description) {
      parameters += `&summary=${p.frontmatter.description}`;
    }
    return `https://www.linkedin.com/shareArticle${parameters}`;
  }

  static getLinkedInProfileUrl(): string {
    return `https://linkedin.com/in/${Config.LinkedInUser}`;
  }

  static getTwitterShareLink(p: PageNode): string {
    return (`http://twitter.com/share?text=${encodeURIComponent(p.frontmatter!.title!)}&url=${Config.SiteUrl + p.fields.slug}/&via=${Config.TwitterUser}`);
  }

  static getFacebookShareLink(p: PageNode): string {
    return (`https://www.facebook.com/sharer/sharer.php?u=${Config.SiteUrl + p.fields.slug}`);
  }

  static getGithubEditLink(p: PageNode): string {
    return urljoin(Config.GitHubRepository, '/blob/develop/content/posts', `${p.fields.slug}.md`);
  }

}
