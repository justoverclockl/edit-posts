import CommentPost from 'flarum/forum/components/CommentPost';
import {extend} from 'flarum/common/extend';
import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import PostControls from 'flarum/forum/utils/PostControls';

app.initializers.add('justoverclock/edit-posts', () => {
  extend(CommentPost.prototype, 'content', function (content) {
    if (!this.attrs.post.canEdit()) {
      return;
    }
    if (this.attrs.post.isHidden()) {
      return;
    }
    content.push(Button.component({
        className: 'Button hidebutton',
        icon: 'fas fa-eye',
        title: app.translator.trans('justoverclock-edit-posts.forum.hidepost'),
        onclick: PostControls.hideAction.bind(this.attrs.post)
      }
    ));
    content.push(Button.component({
        className: 'Button edipostbutton',
        icon: 'fas fa-pen',
        title: app.translator.trans('justoverclock-edit-posts.forum.editpost'),
        onclick: PostControls.editAction.bind(this.attrs.post)
      }
    ));
    content.push(Button.component({
        className: 'Button delpostbutton',
        icon: 'far fa-trash-alt',
        title: app.translator.trans('justoverclock-edit-posts.forum.deleteforever'),
        onclick: PostControls.deleteAction.bind(this.attrs.post)
      }
    ));
  });
  extend(PostControls, 'moderationControls', function (items) {
    if (items.has('edit')) {
      items.remove('edit');
    }
  })
});