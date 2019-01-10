import { decorateClassMember, IAttribute, Reflector } from 'agentframework';

class Protected implements IAttribute {
  public beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor
  ): boolean {
    return false;
  }
}

class Member {
  @decorateClassMember(new Protected())
  level() {}

  @decorateClassMember(new Protected())
  get age(): number {
    return 1;
  }
  set age(v: number) {
    console.log(v);
  }
}

const a = new Member();

console.log(a, Reflector(Member).property('age'));

