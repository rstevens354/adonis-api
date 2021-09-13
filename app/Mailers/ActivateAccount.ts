import View from '@ioc:Adonis/Core/View'
import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

export default class ActivateAccount extends BaseMailer {
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()
  public html = View.render('emails/activate')

  /**
   * The prepare method is invoked automatically when you run
   * "ActivateAccount.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public prepare(message: MessageContract) {
    message
      .subject('The email subject')
      .from('admin@example.com')
      .to('user@example.com')
      .html(this.html)
  }
}
